import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_UTI!);
    const connection = mongoose.connection;

    connection.on("Connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("eror", (err) => {
      console.log(
        "MongoDB connection erro. Please make sure MongoDB is running" + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong !");
    console.log(error);
  }
}
