import { Type } from '@sinclair/typebox'

export const catchWebhookSchema = {
    description: "",
    tags: ["FB Leads"],
    body: Type.Object({
        leadgenId: Type.String(),
        formId: Type.String(),
        formName: Type.String(),
        dateCreated: Type.String({ format: 'date-time' }),
        adId: Type.String(),
        pageId: Type.String(),
        adGroupId: Type.String(),
        platform: Type.String(),
        isOrganic: Type.String(),
        data: Type.Any(), // Use Type.Any() for flexible JSON object
    }),
    response: {
        200: Type.Object({
            status: Type.String(),
        }),
    }
};