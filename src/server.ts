import { Server } from "http";
import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";
import seedSuperAdmin from "./app/DB";
let server: Server;

const main = async () => {
  try {
    // database connection
    mongoose
      .connect(config.db_connection_ser as string)
      .then(() => {
        console.log("db connection successfully");
      })
      .catch((err) => {
        console.log("db connection field");
      });
    seedSuperAdmin();
    server = app.listen(config.port, () => {
      console.log(`app is listening port ${config.port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

// main function call
main();

// handle unhandledRejection
// process.on("unhandledRejection", () => {
//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit(1);
// });

// // handel uncaught exception
// process.on("uncaughtException", () => [process.exit(1)]);
