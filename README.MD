## npm install express body-parser mongoose --save

## npm install nodemon --save

## nodemon app.js

## API details
## create post
##  Method :POST
##  URL: http://localhost:3000/create
##  Request:
##  Response:
{
"message": "Profile added successfully",
"status": 0
}

# get all post

Method :GET
URL: http://localhost:3000/get-details
Response:
[
{
"_id": "6060a64b33acb31644187327",
"id": 1003,
"Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/Richard%20Mathew3350914.jpg",
"createdAt": "2021-03-28T15:52:43.553Z",
"updatedAt": "2021-03-28T15:52:43.553Z",
"__v": 0
},
{
"_id": "6060a98f5c1a7120a024179f",
"id": 1003,
"Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/Richard%20Mathew3350914.jpg",
"createdAt": "2021-03-28T16:06:39.269Z",
"updatedAt": "2021-03-28T16:06:39.269Z",
"__v": 0
}
]

# delete post

Method: DELETE
URL:http://localhost:3000/delete-profile
Request:
{
"\_id": "6060a98f5c1a7120a024179f"
}

Response:
{
"message": "Profile deleted successfully!",
"status": 0
}

# update post

Method: PUT
URL:http://localhost:3000/update-profile
Request:
{
"\_id": "6060b45e589381117cae6c05",
"Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/doug%20hermann1a0ca42.jpg",
"name": "Doug Hermann",
"id": "1006"
}

Response:
{
"message": "Profile deleted successfully!",
"status": 0
}
