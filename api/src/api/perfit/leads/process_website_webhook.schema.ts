import { Type } from '@sinclair/typebox'

export const processWebsiteWebhookSchema = {
    description: "",
    tags: ["Leads"],
    body: Type.Object({

    }),
    response: {
        200: Type.Object({
            status: Type.String(),
        }),
    }
};