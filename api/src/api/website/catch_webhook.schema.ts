import { Type } from '@sinclair/typebox'
import { TypeboxBrands } from "@/types/types";

export const catchWebhookSchema = {
    description: "",
    tags: ["Website"],
    body: Type.Object({
        brand: TypeboxBrands,
    }),
    response: {
        200: Type.Object({
            status: Type.String(),
        }),
    }
};