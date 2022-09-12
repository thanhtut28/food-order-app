import { ApolloServer } from "apollo-server-express";

import express from "express";
import { COOKIE_NAME, PORT, __prod__ } from "./constants/config";
import { schema } from "./api/schema";
import cors from "cors";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

(async () => {
   const app = express();
   const RedisStore = connectRedis(session);
   const redisClient = new Redis();

   app.use(
      session({
         name: COOKIE_NAME,
         store: new RedisStore({ client: redisClient, disableTouch: false }),
         cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 31,
            httpOnly: true,
            sameSite: "lax",
            secure: __prod__,
         },
         saveUninitialized: false,
         secret: "keyboard cat",
         resave: false,
      })
   );

   app.use(
      cors({
         origin: ["https://studio.apollographql.com"],
         credentials: true,
      })
   );

   const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res, redis: redisClient }),
      // plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
   });

   await apolloServer.start();

   apolloServer.applyMiddleware({ app, cors: false });

   app.listen({ port: PORT }, () => {
      console.log(
         `the express server is running at http://localhost:${PORT}${apolloServer.graphqlPath}`
      );
   });
})();
