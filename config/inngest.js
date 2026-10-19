// // src/inngest/client.ts
// import { Inngest } from "inngest";
// import connectDB from "./db";
// import User from "@/models/user";

// export const inngest = new Inngest({ id: "quickcart-next" });



// //Inngest Function to save user data to a database

// export const syncUserCreation=inngest.createFunction(
//     {
//         id:'sync-user-from-clerk'
//     },{
//         event:'clerk/user.created'
//     },
//     async ({event})=>{
//         const{id,
// first_name,
// image_url,
// last_name,email_addresses}=event.data;

// const userData={
//     _id:id,
//     email:email_addresses[0].email_address,
//     name:first_name+' '+last_name,
//     imageUrl:image_url

// }

// await connectDB();
//     await User.create(userData)


//     }
// );

// //Inngest function to update user data in database

// export const syncUserUpdation=inngest.createFunction(
//     {
//         id:'update-user-from-clerk'
//     },
//     {
//         event:'clerk/user.updated'
//     },
//     async({event})=>{
//           const{id,
// first_name,
// image_url,
// last_name,email_addresses}=event.data;

// const userData={
//     _id:id,
//     email:email_addresses[0].email_address,
//     name:first_name+' '+last_name,
//     imageUrl:image_url

// }
// await connectDB();
// await User.findByIdAndUpdate(id,userData);
//     }
// )


// //Ingest function to delete user from database

// export const syncUserDeletion=inngest.createFunction(
//     {
//         id:'dalete-user-with-clerk'
//     },
//     {
//         event:'clerk/user.deleted'
//     },
//     async({event})=>{
//         const {id}=event.data;

//         await connectDB();
//         await User.findByIdAndDelete(id);
//     }
// )



import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/user";
import Order from "@/models/Order";

export const inngest = new Inngest({ id: "quickcart-next" });

export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    triggers: [{ event: "clerk/user.created" }],
  },
  async ({ event }) => {
    const { id, first_name, image_url, last_name, email_addresses } = event.data;

    await connectDB();
    await User.create({
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    });
  }
);

export const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
    triggers: [{ event: "clerk/user.updated" }],
  },
  async ({ event }) => {
    const { id, first_name, image_url, last_name, email_addresses } = event.data;

    await connectDB();
    await User.findByIdAndUpdate(id, {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    });
  }
);

export const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-with-clerk",
    triggers: [{ event: "clerk/user.deleted" }],
  },
  async ({ event }) => {
    await connectDB();
    await User.findByIdAndDelete(event.data.id);
  }
);


//Inngest Function to create user's order in database

export const CreateUserOrder = inngest.createFunction(
  {
    id: "create-user-order",
    batchEvents: {
      maxSize: 25,
      timeout: "5s",
    },
    triggers: [{ event: "order/created" }],
  },
  async ({ events }) => {
    const orders = events.map((event) => ({
      userId: event.data.userId,
      items: event.data.items,
      amount: event.data.amount,
      address: event.data.address,
      date: event.data.date,
    }));

    await connectDB();
    await Order.insertMany(orders);

    return { success: true, processed: orders.length };
  }
);





// export const CreaeUserOrder=inngest.createFunction(
//   {
//     id:'create-user-order',
//     batchEvents:{
//       maxSize:25,
//       timeout:'5s'
//     }
//   },
//   {event:'order/created'},
//   async({events} => {
//     const orders=events.map((event)=>{
//       return{
//         userId:event.data.userId,
//         items:event.data.items,
//         amount:event.data.amount,
//         address:event.data.address,
//         date:event.data.date
//       }
//     })
//   })
// )


