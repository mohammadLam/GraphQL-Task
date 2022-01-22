# SAYBURGH-BACKEND-TASK

### To run this project you need to install project dependencies:

```bash
  yarn install
  or
  npm install
```

Then open the folder with your favorite code editor.

### To run this code:

```bash
  yarn dev
  or
  npm run dev
```

## Routes

---

This project have 3 routes

- Signup route `/api/signup`
- Signin route `/api/signin`
- Blog route `/api/blog`
- Comment route `/api/comment`

### Signup:

To signup you need to hit `/api/signup` this api via `POST` method and need to pass `JSON` body

```json
{
  "name": "muhammadlam",
  "password": "yourpassword"
}
```

---

### Sign In:

To signin you need to hit `/api/signin` this api via `POST` method and need to pass `JSON` body

`Request`

```json
{
  "name": "muhammadlam",
  "password": "yourpassword"
}
```

`Response`

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZWJkMTk4ZDQzNzRmMmRiODNkZjNiMyIsImlhdCI6MTY0Mjg2MzgxMywiZXhwIjoxNjQyODYzODczfQ.yXZobAjhWcbOJUwIbA4hU5VBeNBeTXVypJvRWS-2rfQ"
}
```

---

### Create a blog:

To create a blog you need to hit `/api/blog` this api via `POST` method and need to pass `JSON` body

**NOTE:** You should a authenticated user. And you need to pass Beare token in Authorization header

`Request`

```json
{
  "title": "Post 1",
  "description": "This is our first post",
  "tags": ["post1", "post", "try"],
  "user": "61ebd198d4374f2db83df3b3"
  // User means user id
}
```

`Response`

```json
{
  "title": "Post 1",
  "description": "This is our first post",
  "tags": ["post1", "post", "try"],
  "user": "61ebd198d4374f2db83df3b3",
  "comments": [],
  "_id": "61ebf8ce9d06b10fce8606fe",
  "createdAt": "2022-01-22T12:30:06.515Z",
  "updatedAt": "2022-01-22T12:30:06.515Z",
  "__v": 0
}
```

---

### Update a blog:

To update a blog you need to hit `/api/blog` this api via `PUT` method and need to pass `JSON` body

**NOTE:** You should a authenticated user. And you need to pass Beare token in Authorization header

`Requet`

```json
{
  // id means blog id
  "id": "61ebf674b8af120fcfd1ccab",
  "title": "Post 1 updated",
  "description": "This is our updated post",
  "tags": ["post1 updated", "post updated", "try"],
  "user": "61ebe956e2b4026ceb0b4ec7"
}
```

`Response`

```json
{
  "title": "Post 1 updated",
  "description": "This is our updated post",
  "tags": ["post1", "post", "try"],
  "user": "61ebd198d4374f2db83df3b3",
  "comments": [],
  "_id": "61ebf8ce9d06b10fce8606fe",
  "createdAt": "2022-01-22T12:30:06.515Z",
  "updatedAt": "2022-01-22T12:30:06.515Z",
  "__v": 0
}
```

---

### Delete a blog:

To delete a blog you need to you need to hit `/api/blog/:id` via `DELETE` method.

**NOTE:** You should a authenticated user. And you need to pass Beare token in Authorization header

```json
{
  "success": "Blog deleted"
}
```

---

### Make a comment:

To comment on a blog you need to you need to hit `/api/comment` via `POST` method. And need to pass `JSON` body.

**NOTE:** You should a authenticated user. And you need to pass Beare token in Authorization header

`Request`

```json
{
  // blog means blog id
  "blog": "61ebf674b8af120fcfd1ccab",
  "body": "wow this is amazing post, i like eat"
}
```

`Response`

```json
{
  "_id": "61ec0c37ed12ab7d21439c03",
  "title": "my 1st blog",
  "description": "This is first post description",
  "tags": ["1st", "second", "post"],
  "user": "61ebd198d4374f2db83df3b3",
  "comments": ["61ec1ced7683713113a75f93"],
  "createdAt": "2022-01-22T13:52:55.139Z",
  "updatedAt": "2022-01-22T15:04:13.078Z",
  "__v": 0
}
```

---

### Get all blog post:

To get all blog post you need to hit `/api/blog` this api via `get`

`Response`

```json
[
  {
    "_id": "61ec0c37ed12ab7d21439c03",
    "title": "my 1st blog",
    "description": "This is first post description",
    "tags": ["1st", "second", "post"],
    "user": {
      "_id": "61ebd198d4374f2db83df3b3",
      "name": "alaminislam"
    },
    "comments": [
      {
        "_id": "61ec1ced7683713113a75f93",
        "body": "wow this is amazing post, i like eat"
      }
    ],
    "createdAt": "2022-01-22T13:52:55.139Z"
  },
  {
    "_id": "61ec0c48ed12ab7d21439c06",
    "title": "my last blog",
    "description": "This is first last description",
    "tags": ["1st", "second", "post"],
    "user": {
      "_id": "61ebd198d4374f2db83df3b3",
      "name": "alaminislam"
    },
    "comments": [],
    "createdAt": "2022-01-22T13:53:12.084Z"
  }
]
```
