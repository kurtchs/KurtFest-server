# KurtFest-server

## [See the App!](https://kurtfest-app.netlify.app/)



## Description

**NOTE -** Kurtfest es una aplicación que te ayuda a descubrir una gran variedad de eventos de música cerca de ti.

#### [Client Repo here](https://kurtfest-app.netlify.app/)
#### [Server Repo here](https://github.com/kurtchs/KurtFest-server)

## Backlog Functionalities

**NOTE -** List here all functionalities you wish to add to your proyect later or that you are currently working on

## Technologies used
HTML, CSS, Javascript, Express, React, axios, React Context .

# Server Structure

## Models

User model

{
  email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    username: {
      type: String,
      required: [true, 'Email is required.'],
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    role: {
      type: String,
      enum:["user", "admin"],
      default: "user"
    },
    ticketsPurchased: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
      }
    ]
}
```

Ticket model

```javascript
 {
  username:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
        date: String,
        event:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true
        },
        hour: String,
        location: String,
        totalAmount: Number
  })

```
Event model

   name: {
      type: String,
      required: true,
      unique: true
    },
      date: String,
      info: String,
      hour: String,
      location: String,
      totalAmount:{
        type: Number,
        required:true
      },
      genre: {
        type:[String],
        enum:["Rock","Electronica"]
      },
      admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      imageUrl: {
        type: String,
        required: false
      },

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                    |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | -------------------------------------------------------------- |
| POST        | `/auth/signup`              | {name, email, password}      | 201            | 400          | Registers the user in the Database                             |
| POST        | `/auth/login`               | {username, password}         | 200            | 400          | Validates credentials, creates and sends Token                 |
| GET         | `/auth/verify`              |                              | 200            | 401          | Verifies the user Token                                        |
| GET         | `/`                     |                              | 200            | 400          | show the events info and images                   |
| POST        | `/addevent/`                     | {apiId}                      | 201            | 400          | Creates a new Event Document                                    |
| GET         | `/:eventId`             |                              | 200            | 400, 401     | Sends all Events Details                                         |
| PUT         | `/editevent/:eventId`             |                              | 200            | 400, 401     | Edits events document                                            |
| DELETE      | `/:id`             |                              | 200            | 401          | Deletes event document                                          |
| GET         | `/profile`                  |                              | 200            | 401          | Sends user profile details                                     |
| PATCH         | `/:userId`                  |                              | 200            | 400, 401     | Edits the user                                     |
  | GET         | `/`                     |                              | 200            | 400          | show the events info and images                   |
| POST        | `/addevent/`                     | {apiId}                      | 201            | 400          | Creates a new Event Document                                    |
| GET         | `/:userId`             |                              | 200            | 400, 401     | Sends all Events ticketsDetails                                         |

| DELETE      | `/:id`             |                              | 200            | 401          | Deletes event tickets   


### Project

[Repository Link Client](https://kurtfest-app.netlify.app/)

[Repository Link Server](https://github.com/kurtchs/KurtFest-server)

[Deploy Link](https://kurtfest-app.netlify.app/)