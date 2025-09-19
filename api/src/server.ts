// @ts-ignore

import dotenv from "dotenv";
import { version } from "@/../package.json";

import Fastify from "fastify";
import jwt, { JWT } from "@fastify/jwt";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

//@ts-ignore
import mailer from "fastify-mailer";

import Ajv from "ajv";
import ajvFormats from "ajv-formats";

/*import authenticate from "@/decorators/authenticate";
import authenticateAdmin from "@/decorators/authenticateAdmin";
import authorize from "@/decorators/authorize";
import authorizeAdmin from "@/decorators/authorizeAdmin";
*/
import { AccountToken } from "@/types/types";
import { TypedFastifyInstance } from "@/types/types";

import { handleError } from "@/services/response";
import { ErrorResponse } from "@/services/response";

import { Transporter } from "nodemailer";

dotenv.config();

export interface FastifyMailerNamedInstance {
  [namespace: string]: Transporter;
}
export type FastifyMailer = FastifyMailerNamedInstance & Transporter;

// declare custom addons to fastify
declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
    matchedPermission: string;
  }
  export interface FastifyInstance {
    authenticate: any;
    authenticateAdmin: any;
    authorize: any;
    authorizeAdmin: any;
    mailer: FastifyMailer;
  }
}
declare module "@fastify/jwt" {
  interface FastifyJWT {
    accountToken: AccountToken | null;
  }
}

export default async () => {
  // Fastify server instance
  const fastify: TypedFastifyInstance = Fastify({
    logger: true,
  }).withTypeProvider<TypeBoxTypeProvider>();

  // CORS
  await fastify.register(import("@fastify/cors"), {
    // put your options here
    origin: "*",//"http://localhost:5173", // Allow requests from this origin
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type"], // Allow specific headers
  });

  // Rate limit (global scope)
  /*await fastify.register(import("@fastify/rate-limit"), {
    max: 50,
    timeWindow: "1 minute",
  });?*/

  // Swagger setup
  await fastify.register(import("@fastify/swagger"), {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "perFIT API",
        description: "Testing the Fastify swagger API",
        version: version,
      },
      servers: [
        {
          url: "http://localhost:8000",
          description: "Development server",
        },
      ],
      tags: [
        { name: "Healthcheck", description: "Healthcheck end-point" },
        { name: "FB Leads", description: "FB Leads end-points" },
        { name: "Website", description: "Website end-points" },
        { name: "perFIT", description: "perFIT specific end-points" },

      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
    },
  });

  // Swagger UI setup
  await fastify.register(import("@fastify/swagger-ui"), {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request: any, reply: any, next: any) {
        next();
      },
      preHandler: function (request: any, reply: any, next: any) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header: any) => header,
    transformSpecification: (swaggerObject: any, request: any, reply: any) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  // Add JWT secret
  //await fastify.register(jwt, { secret: process.env.JWT_SECRET as string });

  // Email
  /*fastify.register(mailer, {
    defaults: {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
    },
    transport: {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_HOST_PASSWORD,
      },
    },
  });*/

  // Add authenticate decorator
  //fastify.decorate("authenticate", authenticate);

  // Add authenticate decorator for admin
  //fastify.decorate("authenticateAdmin", authenticateAdmin);

  // Add authorize decorator (match one of the required permissions)
  //fastify.decorate("authorize", (requiredPermissionList: any) =>
  //  authorize(requiredPermissionList, fastify)
  //);

  // Add authorize decorator for admin (match one of the required permissions)
  //fastify.decorate("authorizeAdmin", (requiredPermissionList: any) =>
  //  authorizeAdmin(requiredPermissionList, fastify)
  //);

  // Add Redis database
  /*await fastify.register(import("@fastify/redis"), {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    tls: {},
    family: 4, // 4 (IPv4) or 6 (IPv6)
    namespace: "companyShardIdCache",
    closeClient: true,
  });
  fastify.log.info("Connected to Redis");
*/
  // Add plugin - databases
  await fastify.register(import("@/plugins/mainDB_connection"));
  /*await fastify.register(import("@/plugins/adminDB_connection"));
  await fastify.register(import("@/plugins/lookupDB_connection"));
  await fastify.register(import("@/plugins/accountDB_connection"));
  let shardNumber = 1;
  while (process.env[`DATABASE_SHARD_${shardNumber}_URL`]) {
    await fastify.register(import("@/plugins/shardDB_connections"), {
      shard: shardNumber,
    });
    shardNumber++;
  }*/

  // Add plugin - i18n
  //await fastify.register(import("@/plugins/i18n"));

  // Add plugin - pusher
  //await fastify.register(import("@/plugins/pusher"));

  // Add Healthcheck route
  fastify.get(
    "/healthcheck",
    {
      schema: {
        description: "",
        tags: ["Healthcheck"],
      },
    },
    async function () {
      return { status: "OK" };
    }
  );

  // Ajv (JSON schema validator)
  const ajv = new Ajv({ allErrors: true });

  // Add extra Ajv formats
  ajvFormats(ajv, [
    "date-time",
    //'time',
    //'date',
    "email",
    //'hostname',
    //'ipv4',
    //'ipv6',
    //'uri',
    //'uri-reference',
    //'uuid',
    //'uri-template',
    //'json-pointer',
    //'relative-json-pointer',
    //'regex'
  ]);
  fastify.setValidatorCompiler(({ schema }) => ajv.compile(schema));

  // handle custom error messages
  /*fastify.setErrorHandler((error, request, reply) => {
    handleError(
      request,
      reply,
      new ErrorResponse(error.message, error?.statusCode || 400)
    );
  });*/

  // All API endpoints
  await fastify.register(import("@/api"), { prefix: "/api" });

  // Serve Swagger API docs
  await fastify.ready();
  fastify.swagger();

  return fastify;
};
