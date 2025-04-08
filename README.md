# Project Name

## [See the App!](www.your-deploy-url-here.com)

![App Logo](your-image-logo-path-or-name)

## Description

**NOTE -** Describe your project in one/two lines.

#### [Client Repo here](www.your-github-url-here.com)
#### [Server Repo here](www.your-github-url-here.com)

## Backlog Functionalities

**NOTE -** List here all functionalities you wish to add to your proyect later or that you are currently working on

## Technologies used

**NOTE -** List here all technologies used in the project like HTML, CSS, Javascript, Express, React, axios, React Context etc.

# Server Structure

## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  favs: [{type: Schema.Types.ObjectId,ref:'Game'}]
}
```

Game model

```javascript
 {
   title: {type: String, required: true},
   type: {type: String, required: true},
   image: {type: String, required: true},
   apiId {type: Number, required: true},
   status {type: String, enum: ["wishlist", "playing", "finished"]
   creator: {type: Schema.Types.ObjectId,ref:'User'},
 }
```

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                    |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | -------------------------------------------------------------- |
| POST        | `/auth/signup`              | {name, email, password}      | 201            | 400          | Registers the user in the Database                             |
| POST        | `/auth/login`               | {username, password}         | 200            | 400          | Validates credentials, creates and sends Token                 |
| GET         | `/auth/verify`              |                              | 200            | 401          | Verifies the user Token                                        |
| GET         | `/game`                     |                              | 200            | 400          | Show games in the DB, only titles and images                   |
| POST        | `/game`                     | {apiId}                      | 201            | 400          | Creates a new Game Document                                    |
| GET         | `/game/:gameId`             |                              | 200            | 400, 401     | Sends all game Details                                         |
| PUT         | `/game/:gameId`             |                              | 200            | 400, 401     | Edits game document                                            |
| DELETE      | `/game/:gameId`             |                              | 200            | 401          | Deletes game document                                          |
| GET         | `/profile`                  |                              | 200            | 401          | Sends user profile details                                     |
| PUT         | `/profile`                  |                              | 200            | 400, 401     | Edits the user profile                                         |
| PATCH       | `/profile/:gameId`          |                              | 200            | 401          | Adds game to favourite                                         |
| GET         | `/gameApi`                  |                              | 200            | 401          | Gets game data from API (Search)                               |
| GET         | `/gameApi/:apiId`           |                              | 200            | 401          | Gets game details from API                                     |
  
## Links

### Collaborators

[Developer 1 name](www.github-url.com)

[Developer 2 name](www.github-url.com)

### Project

[Repository Link Client](www.your-github-url-here.com)

[Repository Link Server](www.your-github-url-here.com)

[Deploy Link](www.your-deploy-url-here.com)