import { Type } from '@sinclair/typebox'

export const setAdInformationSchema = {
    description: "",
    tags: ["FB Leads"],
    body: Type.Array(Type.Object({
        id: Type.String(),
        name: Type.String(),
        adset: Type.Object({
            id: Type.String(),
            name: Type.String(),
        }),
        campaign: Type.Object({
            id: Type.String(),
            name: Type.String(),
        }),
        account_id: Type.String(),
        tracking_specs: Type.Any(),
        configured_status: Type.String(),
        effective_status: Type.String(),
        status: Type.String(),
        creative: Type.Object({
            id: Type.String(),
            name: Type.String(),
        }),
        preview_shareable_link: Type.String(),

        created_time: Type.String({ format: 'date-time' }),
        updated_time: Type.String({ format: 'date-time' }),
    })),
    response: {
        200: Type.Object({
            status: Type.String(),
        }),
    }
};