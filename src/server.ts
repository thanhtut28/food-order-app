import { ApolloServer } from "apollo-server-express";

import express from "express";
import { PORT } from "./constants/config";
import { schema } from "./api/schema";
import cors from "cors";

(async () => {
   const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
   });

   const app = express();

   app.use(
      cors({
         origin: ["https://studio.apollographql.com"],
         credentials: true,
      })
   );

   app.get("/hello", (req, res, next) => {
      throw new Error("hello");
   });

   await apolloServer.start();

   apolloServer.applyMiddleware({ app, cors: false });

   app.listen({ port: PORT }, () => {
      console.log(
         `the express server is running at http://localhost:${PORT}${apolloServer.graphqlPath}`
      );
   });
})();
