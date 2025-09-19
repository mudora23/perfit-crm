import { Type } from '@sinclair/typebox'

export const getAdAccountConfigsSchema = {
    description: "",
    tags: ["FB Leads"],
    body: Type.Any(),
    response: {
        200: Type.Array(Type.Object({
            ad_account_id: Type.String(),
            business_manager_id: Type.String(),
            is_enabled: Type.Boolean(),
        })),
    }
};