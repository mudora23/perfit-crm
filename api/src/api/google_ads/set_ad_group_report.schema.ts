import { Type } from '@sinclair/typebox'

export const setAdGroupReportSchema = {
    description: "",
    tags: ["Google Ads"],
    body: Type.Array(Type.Object({
        segments_date: Type.String({ format: 'date' }),
        adGroup_id: Type.String(),
        campaign_id: Type.String(),
        customer_id: Type.String(),
    })),
    response: {
        200: Type.Object({
            status: Type.String(),
        }),
    }
};