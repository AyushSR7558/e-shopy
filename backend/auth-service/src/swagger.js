import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Auth Service API",
    description: "Automatic generate Swagger docs",
    version: "1.0.0",
  },
  
  host: "localhost:6001",
  schemes: ["http"],
  basePath:"/api"
};

const outputfile = "./swagger-output.json";
const endpoints = ["./route/auth.route.ts"];

swaggerAutogen()(outputfile, endpoints, doc);
