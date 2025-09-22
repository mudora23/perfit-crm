import { Type } from '@sinclair/typebox'

export const setCampaignInformationSchema = {
    description: "",
    tags: ["Google Ads"],
    body: Type.Array(Type.Object({
        id: Type.String(),
        name: Type.String(),
        baseCampaign: Type.String(),
        resourceName: Type.String(), // "customers/2313560386/adGroups/183872555734"
        servingStatus: Type.String(),
        status: Type.String(),
    })),
    response: {
        200: Type.Object({
            status: Type.String(),
        }),
    }
};