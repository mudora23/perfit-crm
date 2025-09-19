import { Type } from '@sinclair/typebox'

export const processWebsiteWebhookSchema = {
    description: "",
    tags: ["perFIT"],
    body: Type.Any(),
    response: {
        200: Type.Object({
            status: Type.String(),
        }),
    }
};