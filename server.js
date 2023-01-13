const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.set("strictQuery", false);
const { app } = require("./app");

async function main() {
  try {
    await mongoose.connect(process.env.HOST_URI);
    console.log("Database connection successful");

    app.listen(3000, () => {
      console.log("server is listening on port 3000");
    });
  } catch (error) {
    console.error("main failed:", error.message);
    process.exit(1);
  }
}
main();
