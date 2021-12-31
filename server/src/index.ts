require("dotenv").config();
import "reflect-metadata";
import express from "express";
import mongoose from "mongoose";
import { createConnection } from "typeorm";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { User } from "./entites/User";
import { Course } from "./entites/Course";
import { UserRole } from "./entites/UserRole";
import { CourseCategory } from "./entites/CourseCategory";
import { UserResolver } from "./resolvers/user";
import cors from "cors";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import session from "express-session";
import MongoStore from "connect-mongo";
import { COOKIE_NAME, MAX_AGE, __prod__ } from "./constant";
import { Context } from "./types/Context";
import { UploadImageResolver } from "./resolvers/uploadImage";
import { CourseResolver } from "./resolvers/course";
import { graphqlUploadExpress } from "graphql-upload";
import { CourseCategoryResolver } from "./resolvers/courseCategory";
import { UserRoleResolver } from "./resolvers/userRole";
import { Enroll } from "./entites/Enroll";
import { buildDataLoaders } from "./utils/dataLoader";

const main = async () => {
  const connection = await createConnection({
    type: "postgres",
    ...(__prod__
      ? { url: process.env.DATABASE_URL }
      : {
          database: "e-learning",
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
        }),

    logging: true,
    ...(__prod__
      ? {
          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
          ssl: true,
        }
      : {}),

    ...(__prod__ ? {} : { synchronize: true }),

    entities: [User, UserRole, Course, CourseCategory, Enroll],
    migrations: [path.join(__dirname, "/migrations/*")],
  });

  if (__prod__) await connection.runMigrations();

  const app = express();

  //Session/Cookie store

  const mongoUrl = `mongodb+srv://${process.env.MONGODB_USERNAME_SESSION}:${process.env.MONGODB_PASSWORD_SESSION}@elearning.y662b.mongodb.net/E-Learning?retryWrites=true&w=majority`;

  await mongoose.connect(mongoUrl);

  console.log("MongoDB connected");

  app.use(
    session({
      name: COOKIE_NAME,
      store: MongoStore.create({ mongoUrl }),
      cookie: {
        maxAge: MAX_AGE,
        httpOnly: true, //JS Browser cannot access the cookie
        secure: __prod__, //cookie only works in https
        sameSite: "lax", //protection against CSRF
        domain: __prod__ ? '' : undefined
      },
      secret: `${process.env.SESSION_SECRET}`,
      saveUninitialized: false, //don't save empty sessions, right from the start
      resave: false,
    })
  );

  const corsOption = {
    origin: __prod__
      ? process.env.CORS_ORIGIN_PROD_CLIENT
      : process.env.CORS_ORIGIN_DEV_CLIENT,
    credentials: true,
  };

  app.use(cors(corsOption));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        CourseResolver,
        UploadImageResolver,
        CourseCategoryResolver,
        UserRoleResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }): Context => ({
      req,
      res,
      connection,
      dataLoaders: buildDataLoaders(),
    }),
    introspection: true,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        settings: {
          "request.credentials": "include",
        },
      }),
    ],
  });

  await apolloServer.start();

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () =>
    console.log(
      `Server started at port ${PORT}. 🚀 Graphql server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    )
  );
};

main().catch((error) => console.log(error));
