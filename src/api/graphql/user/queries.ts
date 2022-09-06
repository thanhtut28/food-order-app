import { db } from "../../../utils/db";
import { builder } from "../../builder";

builder.queryFields(t => ({
   users: t.prismaField({
      type: ["User"],
      resolve: async (query, _root, ctx) => {
         return db.user
            .findMany({ ...query })
            .then(users => {
               if (users.length === 0) {
                  throw new Error("no users found");
               }
               return users;
            })
            .catch(err => {
               throw new Error(err);
            });
      },
   }),
}));
