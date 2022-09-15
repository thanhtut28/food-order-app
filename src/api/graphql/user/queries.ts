import { db } from "../../../utils/db";
import { builder } from "../../builder";

builder.queryFields(t => ({
   users: t.prismaField({
      type: ["User"],
      resolve: async (query, _root, _args) => {
         return db.user
            .findMany({ ...query })
            .then(users => {
               if (users.length === 0) {
                  throw new Error("no users found");
               }
               return users;
            })
            .catch((err: unknown) => {
               console.log(err);
               throw err;
            });
      },
   }),

   me: t.prismaField({
      type: "User",
      nullable: true,
      skipTypeScopes: true,
      resolve: async (query, _root, _args, { req }) => {
         const userId = req.session.userId;

         if (!userId) {
            return null;
         }
         return db.user.findUnique({ ...query, where: { id: userId } });
      },
   }),
}));
