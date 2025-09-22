import { Type } from '@sinclair/typebox'

export const setAdGroupInformationSchema = {
    description: "",
    tags: ["Google Ads"],
    body: Type.Array(Type.Object({
        id: Type.String(),
        name: Type.String(),
        baseAdGroup: Type.String(),
        resourceName: Type.String(), // "customers/2313560386/adGroups/183872555734"
        /*
            when using watch ad group:
            campaign = "customers/7782051134/campaigns/743705246"

            when using search ad group:
            campaign = {
                "id": "743705246",
                "resourceName": "customers/7782051134/campaigns/743705246",
                "name": "Search Campaign"
            }
        */
        campaign: Type.Any(),
        status: Type.Optional(Type.String()),
        type: Type.Optional(Type.String()),
    })),
    response: {
        200: Type.Object({
            status: Type.String(),
        }),
    }
};