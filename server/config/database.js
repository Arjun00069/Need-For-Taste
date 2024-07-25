import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Database is connected with ${connection.connection.host}`);
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};
