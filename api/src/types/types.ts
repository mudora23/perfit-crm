import {
  FastifyInstance,
  FastifyBaseLogger,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  FastifyReply,
  FastifyRequest,
  ContextConfigDefault
} from 'fastify'

import { RouteGenericInterface } from 'fastify/types/route';
import { FastifySchema } from 'fastify/types/schema';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import {
    DB as MainDB,
    P9gyt5ysvuuldscFBAds,
    P9gyt5ysvuuldscFBAdsInsights,
    P9gyt5ysvuuldscLeads
} from '@/schemas_db/db_main';
import { Type } from "@sinclair/typebox";

export type FastifyRequestTypebox<TSchema extends FastifySchema> = FastifyRequest<
  RouteGenericInterface,
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  TSchema,
  TypeBoxTypeProvider
>;

export type FastifyReplyTypebox<TSchema extends FastifySchema> = FastifyReply<
  RouteGenericInterface,
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  ContextConfigDefault,
  TSchema,
  TypeBoxTypeProvider
>;

export type TypedFastifyInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>;

export type JsonValue =
  | null
  | boolean
  | number
  | string
  | Date
  | JsonValue[]
  | JsonObject;

export type JsonObject = { [key: string]: JsonValue };

export type JsonArray = JsonValue[];

export type Shard = "admin" | number;

export interface AccountToken {
  id: number;
  email: string;
  type: "accessToken" | "refreshToken";
  isAdmin: boolean;
  isActive: boolean;
}

export interface RegistrationToken {
  email: string;
  fullName: string;
  language: string;
  type: "registrationToken";
  isAdmin: boolean;
}

export interface ResetToken {
  id: number;
  email: string;
  type: "resetToken";
  isAdmin: boolean;
}

export interface SubscriptionToken {
  email: string;
  type: "subscriptionToken";
  isAdmin: boolean;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface TokenWithStatus extends Token {
  isActive: boolean;
}


// Define the mapping of brands to their respective table names
export const brandTableMap = {
    "perFIT": {
        leads: "p9gyt5ysvuuldsc.leads",
        FBAdsLeads: "p9gyt5ysvuuldsc.FB Ads",
        FBAdsInsights: "p9gyt5ysvuuldsc.FB Ads Insights",
    }
} as const;
export const TypeboxBrands = Type.Union([Type.Literal("perFIT")]);

