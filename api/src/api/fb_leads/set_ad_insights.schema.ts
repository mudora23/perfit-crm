import { Type } from '@sinclair/typebox'

export const setAdInsightsSchema = {
    description: "",
    tags: ["FB Leads"],
    body: Type.Array(Type.Object({
        ad_id: Type.String(),
        ad_account_id: Type.String(),
        date_start: Type.String({ format: 'date-time' }),
    })),
    response: {
        200: Type.Object({
            status: Type.String(),
        }),
    }
};