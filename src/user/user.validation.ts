import { ZodType, z } from 'zod';

export class UserValidation {
  static readonly REGISTER: ZodType = z
    .object({
      username: z.string().min(1).max(100),
      password: z.string().min(1).max(100),
      password_confirmation: z.string().min(1).max(100),
      name: z.string().min(1).max(100),
    })
    .refine((data) => data.password === data.password_confirmation, {
      path: ['password_confirmation'],
    });

  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
  });
}
