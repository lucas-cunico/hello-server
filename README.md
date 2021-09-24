# REST API example application

This is a POC application providing a REST
API with no database.

The entire application is contained within the `index.js` file.

`users.js` is a minimal configuration for users persistance.

## Install

    npm install

## Run the app

    npm start

# REST API

The REST API to the example app is described below.

## Get list of userss

### Request

`GET /users/`

    curl -i -H 'Accept: application/json' http://localhost:3001/users/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    [{"id":"1","firstname":"Lucas","lastname":"Kalinowski","email":"lucas-cunico@hotmail.com","deleted":false}]

## Create a new User

### Request

`POST /users/`

    curl -i -H 'Accept: application/json' -d 'name=Foo&status=new' http://localhost:3001/users/

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /users/1
    Content-Length: 36

    {"id":1,"name":"Foo","status":"new"}

## Get a specific users

### Request

`GET /users/id`

    curl -i -H 'Accept: application/json' http://localhost:3001/users/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 36

    {"id":1,"name":"Foo","status":"new"}

## Get a non-existent users

### Request

`GET /users/id`

    curl -i -H 'Accept: application/json' http://localhost:3001/users/9999

### Response

    HTTP/1.1 404 Not Found
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 404 Not Found
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    {"status":404,"reason":"Not found"}

## Create another new users

### Request

`POST /users/`

    curl -i -H 'Accept: application/json' -d 'name=Bar&junk=rubbish' http://localhost:3001/users

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /users/2
    Content-Length: 35

    {"id":2,"name":"Bar","status":null}

## Get list of userss again

### Request

`GET /users/`

    curl -i -H 'Accept: application/json' http://localhost:3001/users/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 74

    [{"id":1,"name":"Foo","status":"new"},{"id":2,"name":"Bar","status":null}]

## Change a users's state

### Request

`PUT /users/:id/status/changed`

    curl -i -H 'Accept: application/json' -X PUT http://localhost:3001/users/1/status/changed

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 40

    {"id":1,"name":"Foo","status":"changed"}

## Get changed users

### Request

`GET /users/id`

    curl -i -H 'Accept: application/json' http://localhost:3001/users/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 40

    {"id":1,"name":"Foo","status":"changed"}

## Change a users

### Request

`PUT /users/:id`

    curl -i -H 'Accept: application/json' -X PUT -d 'name=Foo&status=changed2' http://localhost:3001/users/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 41

    {"id":1,"name":"Foo","status":"changed2"}

## Attempt to change a users using partial params

### Request

`PUT /users/:id`

    curl -i -H 'Accept: application/json' -X PUT -d 'status=changed3' http://localhost:3001/users/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 41

    {"id":1,"name":"Foo","status":"changed3"}

## Attempt to change a users using invalid params

### Request

`PUT /users/:id`

    curl -i -H 'Accept: application/json' -X PUT -d 'id=99&status=changed4' http://localhost:3001/users/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 41

    {"id":1,"name":"Foo","status":"changed4"}

## Change a users using the _method hack

### Request

`POST /users/:id?_method=POST`

    curl -i -H 'Accept: application/json' -X POST -d 'name=Baz&_method=PUT' http://localhost:3001/users/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 41

    {"id":1,"name":"Baz","status":"changed4"}

## Change a users using the _method hack in the url

### Request

`POST /users/:id?_method=POST`

    curl -i -H 'Accept: application/json' -X POST -d 'name=Qux' http://localhost:3001/users/1?_method=PUT

### Response

    HTTP/1.1 404 Not Found
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 404 Not Found
    Connection: close
    Content-Type: text/html;charset=utf-8
    Content-Length: 35

    {"status":404,"reason":"Not found"}

## Delete a users

### Request

`DELETE /users/id`

    curl -i -H 'Accept: application/json' -X DELETE http://localhost:3001/users/1/

### Response

    HTTP/1.1 204 No Content
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 204 No Content
    Connection: close


## Try to delete same users again

### Request

`DELETE /users/id`

    curl -i -H 'Accept: application/json' -X DELETE http://localhost:3001/users/1/

### Response

    HTTP/1.1 404 Not Found
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 404 Not Found
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    {"status":404,"reason":"Not found"}

## Get deleted users

### Request

`GET /users/1`

    curl -i -H 'Accept: application/json' http://localhost:3001/users/1

### Response

    HTTP/1.1 404 Not Found
    Date: Thu, 24 Feb 2011 12:36:33 GMT
    Status: 404 Not Found
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    {"status":404,"reason":"Not found"}

## Delete a users using the _method hack

### Request

`DELETE /users/id`

    curl -i -H 'Accept: application/json' -X POST -d'_method=DELETE' http://localhost:3001/users/2/

### Response

    HTTP/1.1 204 No Content
    Date: Thu, 24 Feb 2011 12:36:33 GMT
    Status: 204 No Content
    Connection: close

