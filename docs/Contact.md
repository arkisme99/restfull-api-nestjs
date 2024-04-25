## Contact API Spec

## Create Contact

Endpoint: POST /api/contacts

Headers:

- Authorization : token

Request Body :

```json
{
  "first_name": "Testing",
  "last_name": "Aplikasi",
  "email": "test@aplikasi.com",
  "phone": "081112121212"
}
```

Response Body (Success, 201) :

```json
{
  "messages": "Create Contact Success",
  "data": {
    "id": "1233-12333-1233123-13123",
    "first_name": "Testing",
    "last_name": "Aplikasi",
    "email": "test@aplikasi.com",
    "phone": "081112121212"
  }
}
```

## Get Contact

Endpoint: GET /api/contacts/:id-contact

Headers:

- Authorization : token

Response Body (Success) :

```json
{
  "messages": "Get Contact Success",
  "data": {
    "id": "1233-12333-1233123-13123",
    "first_name": "Testing",
    "last_name": "Aplikasi",
    "email": "test@aplikasi.com",
    "phone": "081112121212"
  }
}
```

## Update Contact

Endpoint: PUT /api/contacts/:id-contact

Headers:

- Authorization : token

Request Body :

```json
{
  "first_name": "Testing",
  "last_name": "Aplikasi",
  "email": "test@aplikasi.com",
  "phone": "081112121212"
}
```

Response Body (Success) :

```json
{
  "messages": "Update Contact Success",
  "data": {
    "id": "1233-12333-1233123-13123",
    "first_name": "Testing",
    "last_name": "Aplikasi",
    "email": "test@aplikasi.com",
    "phone": "081112121212"
  }
}
```

## Delete Contact

Endpoint: DELETE /api/contacts/:id-contact

Headers:

- Authorization : token

Response Body (Success) :

```json
{
  "messages": "Delete Contact Success",
  "data": true
}
```

## Search Contact

Endpoint: GET /api/contacts

Headers :

- Authorization : token

Query Params :

- name : string, contact first name or last name, optional
- phone : string, contact phone, optional
- email: string, contact email, optional
- page: number, default 1
- size: number, default 10

Response Body (Success) :

```json
{
  "messages": "Search Contact Success",
  "data": [
    {
      "id": "1233-12333-1233123-13123",
      "first_name": "Testing",
      "last_name": "Aplikasi",
      "email": "test@aplikasi.com",
      "phone": "081112121212"
    },
    {
      "id": "1233-12333-1233123-13123",
      "first_name": "Testing",
      "last_name": "Aplikasi",
      "email": "test@aplikasi.com",
      "phone": "081112121212"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```
