## address API Spec

## Create address

Endpoint: POST /api/contacts/:contactId/addresses

Headers:

- Authorization : Bearer token

Request Body :

```json
{
  "street": "Jalan Contoh", //optional
  "city": "Kota Contoh", //optional
  "province": "Provinsi Contoh", //optional
  "country": "Negara Contoh",
  "postal_code": "Kode Pos"
}
```

Response Body (Success, 201) :

```json
{
  "messages": "Create address Success",
  "data": {
    "id": "1233-33333-33333-333",
    "street": "Jalan Contoh",
    "city": "Kota Contoh",
    "province": "Provinsi Contoh",
    "country": "Negara Contoh",
    "postal_code": "Kode Pos"
  }
}
```

## Get address

Endpoint: GET /api/contacts/:contactId/addresses/:id-address

Headers:

- Authorization : Bearer token

Response Body (Success) :

```json
{
  "messages": "Get address Success",
  "data": {
    "id": "1233-33333-33333-333",
    "street": "Jalan Contoh",
    "city": "Kota Contoh",
    "province": "Provinsi Contoh",
    "country": "Negara Contoh",
    "postal_code": "Kode Pos"
  }
}
```

## Update address

Endpoint: PUT /api/contacts/:contactId/addresses/:id-address

Headers:

- Authorization : Bearer token

Request Body :

```json
{
  "street": "Jalan Contoh",
  "city": "Kota Contoh",
  "province": "Provinsi Contoh",
  "country": "Negara Contoh",
  "postal_code": "Kode Pos"
}
```

Response Body (Success) :

```json
{
  "messages": "Update address Success",
  "data": {
    "id": "1233-33333-33333-333",
    "street": "Jalan Contoh",
    "city": "Kota Contoh",
    "province": "Provinsi Contoh",
    "country": "Negara Contoh",
    "postal_code": "Kode Pos"
  }
}
```

## Delete address

Endpoint: DELETE /api/contacts/:contactId/addresses/:id-address

Headers:

- Authorization : Bearer token

Response Body (Success) :

```json
{
  "messages": "Delete address Success",
  "data": true
}
```

## List address

Endpoint: GET /api/contacts/:contactId/addresses

Headers :

- Authorization : Bearer token

Response Body (Success) :

```json
{
  "messages": "List address Success",
  "data": [
    {
      "id": "1233-33333-33333-333",
      "street": "Jalan Contoh",
      "city": "Kota Contoh",
      "province": "Provinsi Contoh",
      "country": "Negara Contoh",
      "postal_code": "Kode Pos"
    },
    {
      "id": "3333-33333-33333-333",
      "street": "Jalan Contoh",
      "city": "Kota Contoh",
      "province": "Provinsi Contoh",
      "country": "Negara Contoh",
      "postal_code": "Kode Pos"
    }
  ]
}
```
