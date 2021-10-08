const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";    

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log("Unable to connect to database.");
  }

  console.log("Connected correctly.");

  // db가 없으면 생성. 있으면 조회
  const db = client.db(databaseName);

  // 해당 db에 collection가 없으면 생성(있으면 조회) 후 document 하나 저장
  db.collection("users").insertOne({
    name: "daeun",
    age: 24,
  });

  //insertMany
  db.collection("users").insertMany(
    [
      {
        name: "Jon",
        age: 28,
      },
      {
        name: "Smith",
        age: 23,
      },
    ],
    (err, result) => {
      if (err) {
        return console.log("Unable to insert user");
      }
	  
      // 실행된 결과 반환
      console.log(result.ops);
    }
  );
  
});