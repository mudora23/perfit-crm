import { Type } from '@sinclair/typebox'
import { TypeboxBrands } from "@/types/types";

export const catchStatisticsSchema = {
    description: "",
    tags: ["Website"],
    body: Type.Object({
        brand: TypeboxBrands,
        uri: Type.String({ format: 'uri' }),
        timestamp: Type.String({ format: 'date-time' }),
        action: Type.String(),

        action_object: Type.Optional(Type.String()),
        uid: Type.Optional(Type.String()),
    }),
    response: {
        200: Type.Object({
            status: Type.String(),
        }),
    }
};