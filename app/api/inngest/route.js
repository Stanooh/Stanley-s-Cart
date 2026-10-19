   import { serve } from "inngest/next";
   import { inngest, syncUserCreation, syncUserUpdation, syncUserDeletion, CreateUserOrder } from "@/config/inngest";

   export const { GET, POST, PUT } = serve({
     client: inngest,
     functions: [syncUserCreation, syncUserUpdation, syncUserDeletion, CreateUserOrder],
   });