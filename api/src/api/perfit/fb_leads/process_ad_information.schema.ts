import { Type } from '@sinclair/typebox'

export const processAdInformationSchema = {
    description: "",
    tags: ["perFIT"],
    body: Type.Null(),
    response: {
        200: Type.Object({
            status: Type.String(),
        }),
    }
};