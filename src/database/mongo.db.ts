import mongosee from 'mongoose';
mongosee.set('strictQuery', true);
export default class mongoDb {

    user:string|undefined;
    password:string|undefined;
    host:string|undefined;
    port:string|undefined;
    db:string|undefined;

    constructor(){
        this.user = process.env.MONGO_USER;
        this.password = process.env.MONGO_PASSWORD;
        this.host = process.env.MONGO_HOST;
        this.port = process.env.MONGO_PORT;
        this.db = process.env.MONGO_DB;
    }

    connect(){
        if(this.user && this.password){
            var mongoUrl = `mongodb://${this.user}:${this.password}@${this.host}:${this.port}/${this.db}`;
        }else{
            var mongoUrl = `mongodb://${this.host}:${this.port}/${this.db}`;
        }
        
        mongosee.connect(mongoUrl);
    }

}