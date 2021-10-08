var Client = require('mongodb').MongoClient;

Client.connect('mongodb://localhost:27017/school', function(error, db){
    if(error) {
        console.log(error);
    } else {
        // 1. 쿼리작성
        var query = {gender:'M'};
        // 2. 읽어올 Field 선택
        var projection = {name:1,age:1,_id:0};
        // 3. find() 함수에 작성된 query와 projection을 입력
        var cursor = db.collection('student').find(query,projection);
        cursor.each(function(err,doc){
            if(err){
                console.log(err);
            }else{
                if(doc != null){
                    console.log(doc);
                }
            }
        });
        db.close();
    }
});

/** 
 * 주의할 점!
 * 기본 필드인 _id 필드를 제외하고는 필드선택 여부가 모두 동일해야 한다.
 * 
 * var prj1 = {name:1, age:1}; // O 가능 - name,age 필드만 가져온다.
 * var prj2 = {name:0, age:0}; // O 가능 - name,age 필드를 제외하고 가져온다.
 * var prj3 = {name:1, age:0}; // X 불가능 - 오류발생  
**/