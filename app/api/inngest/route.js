import { serve } from "inngest/next";
import { CreateUserOrder, inngest, syncUserCreation, syncUserDeletion, syncUserUpdation } from "@/config/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUserCreation,syncUserDeletion,syncUserUpdation,CreateUserOrder],
});