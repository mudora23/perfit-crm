import { Type } from '@sinclair/typebox'

export const findFormInformationMissingSchema = {
    description: "",
    tags: ["FB Leads"],
    body: Type.Null(),
    response: {
        200: Type.Array(Type.Object({
            form_id: Type.String(),
            page_id: Type.String(),
        })),
    }
};