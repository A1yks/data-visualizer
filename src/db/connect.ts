import mongoose from 'mongoose';

let isConnected = false;

async function dbConnect() {
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(process.env.DB_CONNECT);

        isConnected = true;
    } catch (err) {
        console.error(err);
    }
}

export default dbConnect;
