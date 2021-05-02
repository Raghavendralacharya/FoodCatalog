const db = require("../app/models");
const food = db.food;
const foodlist = require("./food.json")
const dbConfig = require("../app/config/db.config");

function randomNumber(min, max) {  
    return Math.round(Math.random() * (max - min) + min); 
} 
const prepareData =()=>{
    let cuisineList = ["Indonesian","Turkish","Thai","Spanish","Moroccan","Japanese","Indian","Italian","French","Chinese"];
    let foodType = ["snack", "breakfast", "lunch", "dinner"];
    let foodPrefix = "food";
    let foodListArr = []
    for(i =0; i<500; i++){
        let foodObj = {};
        foodObj.name =  foodPrefix + i;
        foodObj.cost  = randomNumber(50, 2000)
        foodObj.inventory_available =   randomNumber(10, 500)
        foodObj.cuisine =   cuisineList[Math.floor(Math.random() * cuisineList.length)];
        foodObj.food_type = foodType[Math.floor(Math.random() * foodType.length)];
        foodListArr.push(foodObj);
    }
    return foodListArr;
}

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    let foodListArr = prepareData();
    food.insertMany(foodListArr,(err, doc)=>{
        if(err){
            console.log('Loading food catalog failed');
            process.exit(1)
        } else {
            console.log('successfully loaded data');
            process.exit(0)
        }
    })
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });