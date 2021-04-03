## npm install express body-parser mongoose --save

## npm install nodemon --save

## nodemon app.js

## API details

# Method: PUT
# URL : http://localhost:3000/update-movie-seats
# Request Object: 
[
    {
        "availability": true,
        "swachh_bharat_cess": 0.14,
        "krishi_kalyan_cess": 0.5,
        "_id": "60683e4999874f1ecc39ac11",
        "seat_code": "A2",
        "type_of_seat": "Platinum",
        "rate": 320
    },
    {
        "availability": true,
        "swachh_bharat_cess": 0.14,
        "krishi_kalyan_cess": 0.5,
        "_id": "6068409a09be002dd0212411",
        "seat_code": "B2",
        "type_of_seat": "Platinum",
        "rate": 280
    }
]
# Response :
{
    "message": "Movie Seat updated successfully!",
    "status": 0
}

# GET
# http://localhost:3000/get-movie-seat-details
# Response Object: 
[
    {
        "availability": false,
        "swachh_bharat_cess": 0.14,
        "krishi_kalyan_cess": 0.5,
        "_id": "60683e4999874f1ecc39ac11",
        "seat_code": "A2",
        "type_of_seat": "Platinum",
        "rate": 320,
        "createdAt": "2021-04-03T10:07:05.382Z",
        "updatedAt": "2021-04-03T10:50:29.655Z",
        "__v": 0
    },
    {
        "availability": false,
        "swachh_bharat_cess": 0.14,
        "krishi_kalyan_cess": 0.5,
        "_id": "6068409a09be002dd0212411",
        "seat_code": "B2",
        "type_of_seat": "Platinum",
        "rate": 280,
        "createdAt": "2021-04-03T10:16:58.080Z",
        "updatedAt": "2021-04-03T10:50:29.655Z",
        "__v": 0
    }
]