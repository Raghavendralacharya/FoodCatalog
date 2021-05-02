steps:
1. npm install command will install all the dependencies defined in the package json
2. node server.js will start the server
3. As per the requirement 3 api implemented 
    1. food add
    2. food list(with pagination and sorting)
    3. place order


    1. food add:
            Url : http://localhost:8080/api/test/addFood
            sample payload: {
                        "name": "apple4",
                        "cost": "150",
                        "inventory_available": "100",
                        "cuisine": "indian",
                        "food_type": "lunch"
                        }

                sample output:
                        {
                        "status": "success",
                        "data": {
                                "_id": "608e2c2d18845c1987555349",
                                "name": "apple4",
                                "cost": 150,
                                "inventory_available": 100,
                                "cuisine": "indian",
                                "food_type": "lunch",
                                "__v": 0
                        }
                        }

    2. food list: 
            Url : http://localhost:8080/api/test/listFood?name=&cost=&cuisine=&food_type=&size=25&page=0&sort=-name,cuisine
            Query params:
                 name,
                 cost,
                 cuisine,
                 food_type,
                 page,
                 size,
                 sort


                from above query params name, cost, cuisine, food_type are used for filtering the food search. Page and size being used for pagination feature.
                also sorting can be done. 
                For sorting ascending order one has to mention the field name with comma seperated value. for descending append - to the field name


                sample output:
                                {
                                "totalItems": 1,
                                "foodItems": [
                                        {
                                        "_id": "608e2fef2cf0ec1a14ac4b3a",
                                        "name": "food3",
                                        "cost": 1244,
                                        "inventory_available": 159,
                                        "cuisine": "French",
                                        "food_type": "lunch",
                                        "__v": 0
                                        }
                                ],
                                "totalPages": 1,
                                "currentPage": 0
                                }

    3. place order:
            Url :http://localhost:8080/api/test/orderFood
            sample payload :    {
                                        "user": "raghav",
                                        "items":[
                                                { 
                                                "food_id": "608e29b3447dde1905c3f61a", 
                                                "quantity": "50"
                                                }
                                        ],
                                        "total_amt": "100"
                                }
                sample output: 
                                {
                                "status": "success",
                                "data": {
                                        "orderDateTime": "2021-05-02T04:23:29.915Z",
                                        "_id": "608e29e2447dde1905c3f61b",
                                        "user": "raghav",
                                        "items": [
                                        {
                                                "food_id": "608e29b3447dde1905c3f61a",
                                                "quantity": 50
                                        }
                                        ],
                                        "total_amt": 100,
                                        "__v": 0
                                }
                                }

       *attached postman json can be imported to test the same flow 

        