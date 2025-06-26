import mongoose,  { Mongoose } from 'mongoose';

const MONGODB_URL =  process.env.MONGODB_URL ;

interface MongooseConnection {
    conn : Mongoose | null;
    promise : Promise<Mongoose> | null;

}

let cached: MongooseConnection = ( global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        cached.promise = mongoose.connect(MONGODB_URL as string, {dbName: 'imaginify' , bufferCommands : false }).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}