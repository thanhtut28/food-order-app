import SchemaBuilder from "@pothos/core";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import PrismaPlugin from "@pothos/plugin-prisma";
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects";
import { DateTimeResolver } from "graphql-scalars";

import type PrismaTypes from "../../prisma/pothos-types";
import { Context } from "../utils/types";
import { db } from "../utils/db";
import { AuthenticationError } from "apollo-server-core";
import { ErrorMessage } from "../constants/message";
import { Prisma, User } from "@prisma/client";
import errorHandler from "../utils/error-handler";

export const builder = new SchemaBuilder<{
   AuthScopes: {
      isLoggedIn: boolean;
   };
   Context: Context;
   PrismaTypes: PrismaTypes;
   Scalars: {
      DateTime: {
         Input: Date;
         Output: Date;
      };
   };
}>({
   scopeAuthOptions: {
      unauthorizedError: () => new AuthenticationError(ErrorMessage.NOT_AUTHENTICATED),
   },
   plugins: [ScopeAuthPlugin, PrismaPlugin, SimpleObjectsPlugin],
   prisma: {
      client: db,
   },
   authScopes: async ({ req }) => {
      let user: User | null = null;
      try {
         user = await db.user.findUnique({
            where: { id: req.session.userId },
         });
      } catch (e) {
         if (e instanceof Prisma.PrismaClientInitializationError) {
            errorHandler.throwBaseError();
         }
      }

      return {
         isLoggedIn: !!user,
      };
   },
});

builder.addScalarType("DateTime", DateTimeResolver, {});
