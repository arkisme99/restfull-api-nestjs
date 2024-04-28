## User API Spec

## Register User

Endpoint: POST /api/users

Request Body :

```json
{
  "username": "userTest",
  "password": "rahasia",
  "password_confirmation": "rahasia",
  "name": "User Test Aplikasi"
}
```

Response Body (Success, 201):

```json
{
  "messages": "Register User Success",
  "data": {
    "id": "id",
    "username": "userTest",
    "name": "User Test Aplikasi"
  }
}
```

Response Body (Failed):

```json
{
  "errors": ""
}
```

## Login User

Endpoint: POST /api/users/login

Request Body :

```json
{
  "username": "userTest",
  "password": "rahasia"
}
```

Response Body (Success):

```json
{
  "messages": "Login Success",
  "data": {
    "id": "id User",
    "username": "userTest",
    "name": "User Test Aplikasi",
    "accessToken": "token",
    "refreshToken": "token"
  }
}
```

## Get User

Endpoint: GET /api/users/current

Headers :

- authorization: Bearer token

Response Body (Success):

```json
{
  "messages": "Get Current User",
  "data": {
    "id": "id User",
    "username": "userTest",
    "name": "User Test Aplikasi"
  }
}
```

## Update User

Endpoint: PATCH /api/users/current

Headers:

- authorization: Bearer token

Request Body :

```json
{
  "password": "rahasia", //optional if you want to change
  "name": "User Test Aplikasi" //optional if you want to change
}
```

Response Body (Success):

```json
{
  "messages": "Update User Success",
  "data": {
    "username": "userTest",
    "name": "User Test Aplikasi"
  }
}
```

## Refresh User

Endpoint: POST /api/users/refresh

Headers:

- authorization: Bearer token

Response Body (Success):

```json
{
  "messages": "Refresh Success",
  "data": {
    "id": "id User",
    "username": "userTest",
    "name": "User Test Aplikasi",
    "accessToken": "token",
    "refreshToken": "token"
  }
}
```

## Logout User

Endpoint: POST /api/users/logout

Headers:

- authorization: Bearer token

Response Body (Success):

```json
{
  "messages": "Logout User Success",
  "data": true
}
```
