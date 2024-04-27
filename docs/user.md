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
    "username": "userTest",
    "name": "User Test Aplikasi",
    "token": "session_id_generated"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Username or password is wrong"
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
    "username": "userTest",
    "name": "User Test Aplikasi"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized"
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

Response Body (Failed):

```json
{
  "errors": ""
}
```

## Logout User

Endpoint: DELETE /api/users/current

Headers:

- authorization: Bearer token

Response Body (Success):

```json
{
  "messages": "Logout User Success",
  "data": true
}
```

Response Body (Failed):

```json
{
  "errors": ""
}
```
