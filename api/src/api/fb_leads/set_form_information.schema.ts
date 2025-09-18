import { Type } from '@sinclair/typebox'

export const setFormInformationSchema = {
    description: "",
    tags: ["Cron"],
    body: Type.Array(Type.Object({
        id: Type.String(),
        name: Type.String(),
        page_id: Type.String(),
        created_time: Type.String({ format: 'date-time' }),
    })),
    response: {
        200: Type.Object({
            status: Type.String(),
        }),
    }
};