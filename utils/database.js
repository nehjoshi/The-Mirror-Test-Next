import mongoose from 'mongoose';

let isConnected = false;

export const ConnectToDb = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }
    else {
        try {
            await mongoose.connect(process.env.DB_URI, {
                dbName: "The_Mirror_Test",
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            isConnected = true;
            console.log("MongoDB Connected");
        }catch(error) {
            console.log(error);
        }
    }
}