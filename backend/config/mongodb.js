import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(
            `${process.env.MONGODB_URI}/e-commerce?retryWrites=true&w=majority`
        );

        console.log("Database Connected");
    } catch (error) {
        console.error("Error connecting to the database", error.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
