const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://admin:1234@jbh-test.zyprl.mongodb.net'; 
const client = new MongoClient(url, {useUnifiedTopology: true});
// Database Name
const dbName = 'homework';

const connect = async() =>{
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("comments");

    await collection.insertOne({body: "Inserted Note 1"});
    await collection.insertMany([
        {body: "This is array of notes insert1"}, 
        {body: "This is array of notes insert2", doindate: "21-01-2021"},
        {body: "This is array of notes insert3", friendstoinvite: [ {name: "ron"} ,{name: "dani"} ] }
    ]);

    const post6com = await collection.find({postId : 6}).project({body: 1}).toArray();
    console.log(post6com);
    const post7com = await collection.find({postId : 7}).count();
    console.log("post7com: "+ post7com);

    const all12com = await collection.find({
        $and: [{postId: "1"}, {postId: "2"}]
    }).project({body: 1}).toArray();
    console.log("all12com: " +all12com);
    
    const delete8com = await collection.deleteMany({postId: 8});
    console.log("delete8com: " + delete8com.deletedCount);

    const findemail = await collection.find({email: "Claudia@emilia.ca"}).project({_id: 1, email: 1});
    console.log("findemail: " + findemail);
    
    const updateemail = await collection.updateOne({email: "Claudia@emilia.ca"},
        {$set: {email: "new@email.com"}}
    );
    console.log("updateemail: " + updateemail.upsertedId);

    const updateid11 = await collection.updateOne({id: 11},
        {$set: {body: "New updated comment"}}
    ).project({body: 1});
    console.log("updateid11: " + updateid11);

    const aliquamcount = await collection.find({body: {$regex : ".*aliquam.*"}}).count();
    console.log("aliquamcount: " + aliquamcount);

    
    client.close();
}
connect();