const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "API for the backend of the project",
    },
    servers: [
      {
        url: "http://localhost:5000/",
      },
    ],
  },
  apis: ["./routers/*.js"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          firstName: {
            type: "string",
            description: "The first name of the user",
            example: "John",
          },
          lastName: {
            type: "string",
            description: "The last name of the user",
            example: "Doe",
          },
          email: {
            type: "string",
            description: "The email of the user",
            example: "",
          },
          password: {
            type: "string",
            description: "The password of the user",
            example: "",
          },
        },
      },
      Job: {
        type: "object",
        properties: {
          user: {
            type: "string",
            description: "The unique identifier of the user",
            example: "61234567890abcdef1234567",
          },
          title: {
            type: "string",
            description: "The title of the job",
            example: "Software Engineer",
          },
          description: {
            type: "string",
            description: "The description of the job",
            example: "Developing software applications",
          },
          requirements: {
            type: "string",
            description: "The requirements for the job",
            example: "Bachelor's degree in Computer Science",
          },
          location: {
            type: "string",
            description: "The location of the job",
            example: "New York, USA",
          },
          company: {
            type: "string",
            description: "The company offering the job",
            example: "ABC Company",
          },
          type: {
            type: "array",
            items: {
              type: "string",
            },
            description: "The type of job",
            example: ["Full-time", "Remote"],
          },
          skills: {
            type: "string",
            description: "Skills required for the job",
            example: "JavaScript, Python, React",
          },
        },
      },
    },
  },
};

const specs = swaggerJsDoc(options);
module.exports = specs;
