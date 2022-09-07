import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects";
import { DateTimeResolver } from "graphql-scalars";

import type PrismaTypes from "../../prisma/pothos-types";
import { Context } from "../utils/types";
import { db } from "../utils/db";

export const builder = new SchemaBuilder<{
   Context: Context;
   PrismaTypes: PrismaTypes;
   Scalars: {
      DateTime: {
         Input: Date;
         Output: Date;
      };
   };
}>({
   plugins: [PrismaPlugin, SimpleObjectsPlugin],
   prisma: {
      client: db,
   },
});

builder.addScalarType("DateTime", DateTimeResolver, {});
