import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('UserController', () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  describe('POST /api/users', () => {
    beforeEach(async () => {
      await testService.deleteUser();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: 'testAplikasi',
          password: 'test',
          password_confirmation: '12345',
          name: 'test salah password',
        });

      logger.info(response.body);
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to register', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: 'testAplikasi',
          password: '12345678',
          password_confirmation: '12345678',
          name: 'Test Aplikasi',
        });

      logger.info(response.body);
      expect(response.status).toBe(201);
      expect(response.body.data.username).toBe('testAplikasi');
      expect(response.body.data.name).toBe('Test Aplikasi');
    });

    it('should be rejected if username already exists', async () => {
      await testService.createUser();
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: 'testAplikasi',
          password: '12345678',
          password_confirmation: '12345678',
          name: 'Test Aplikasi',
        });

      logger.info(response.body);
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('POST /api/users/login', () => {
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
    });
    it('should be rejected if password is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: 'testAplikasi',
          password: 'password salah',
        });

      logger.info(response.body);
      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if username not found', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: 'usernameSalah',
          password: '12345678',
        });

      logger.info(response.body);
      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to login', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/login')
        .send({
          username: 'testAplikasi',
          password: '12345678',
        });

      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('testAplikasi');
      expect(response.body.data.name).toBe('Test Aplikasi');
      expect(response.body.data.accessToken).toBeDefined();
      expect(response.body.data.refreshToken).toBeDefined();
    });
  });

  describe('GET /api/users/current', () => {
    let tokenn = '';
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
      const prosesLogin = await testService.loginUser();
      tokenn = prosesLogin.accessToken;
    });

    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/users/current')
        .set('Authorization', 'Bearer invalidToken');

      logger.info(response.body);
      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to get current users', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/users/current')
        .set('Authorization', `Bearer ${tokenn}`);

      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('testAplikasi');
      expect(response.body.data.name).toBe('Test Aplikasi');
    });
  });

  describe('POST /api/users/logout', () => {
    let tokenn = '';
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
      const prosesLogin = await testService.loginUser();
      tokenn = prosesLogin.accessToken;
    });

    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/logout')
        .set('Authorization', 'Bearer invalidToken');

      logger.info(response.body);
      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to logout', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/logout')
        .set('Authorization', `Bearer ${tokenn}`);

      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data).toBe(true);
    });
  });

  describe('POST /api/users/refresh', () => {
    let accessTokenn = '';
    let refreshTokenn = '';
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
      const prosesLogin = await testService.loginUser();
      accessTokenn = prosesLogin.accessToken;
      refreshTokenn = prosesLogin.refreshToken;
    });

    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/refresh')
        .set('Authorization', `Bearer ${accessTokenn}`);

      logger.info(response.body);
      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to refresh', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/refresh')
        .set('Authorization', `Bearer ${refreshTokenn}`);

      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('testAplikasi');
      expect(response.body.data.name).toBe('Test Aplikasi');
      expect(response.body.data.accessToken).toBeDefined();
      expect(response.body.data.refreshToken).toBeDefined();
    });
  });
});
