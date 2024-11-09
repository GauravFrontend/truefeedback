import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("already connected to database");
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {})
        console.log(db, "kyakya arha h db connect k baad");
        console.log(db.connections, "db.connections");
        
        connection.isConnected = db.connections[0].readyState
        console.log("db connected successfully");
    } catch (error) {
        process.exit()
        console.log("database connection failed");
        
    }
}

export default dbConnect;