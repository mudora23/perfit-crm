import { Type } from '@sinclair/typebox'

export const getAdAccountConfigsSchema = {
    description: "",
    tags: ["Google Ads"],
    body: Type.Object({}),
    response: {
        200: Type.Array(Type.Object({
            ad_account_id: Type.String(),
            is_enabled: Type.Boolean(),
        })),
    }
};