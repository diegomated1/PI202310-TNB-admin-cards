import mongosee from 'mongoose';

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const db = process.env.MONGO_DB;

if(user && password){
    var mongoUrl = `mongodb://${user}:${password}@${host}:${port}/${db}`;
}else{
    var mongoUrl = `mongodb://${host}:${port}/${db}`;
}
export default mongosee.connect(mongoUrl);