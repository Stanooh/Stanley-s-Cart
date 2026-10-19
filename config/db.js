// import mongoose from "mongoose";

// let cached=global.mongoose

// if(!cached){
//     cached=global.mongoose={conn:null, promise:null}
// }

// async function connectDB(){

//     if(cached.conn){
//         return cached.conn
//     }
//     if(!cached.promise){
//         const opts={
//             bufferCommands:false
//         }

//         cached.promise=(await mongoose.connect(`${process.env.MONGODB_URI}/StanleyCart`,opts)).then(mongoose=>{return mongoose})

//     }
//     cached.conn=await cached.promise
//     return cached.conn
// }


// export  default connectDB


// import mongoose from "mongoose";

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectDB() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose
//       .connect(`${process.env.MONGODB_URI}/StanleyCart`, opts)
//       .then((mongoose) => mongoose);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default connectDB;

import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, opts)
      .then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // allow a retry on the next request
    throw error;
  }

  return cached.conn;
}

export default connectDB;