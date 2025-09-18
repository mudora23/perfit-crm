import { Type } from '@sinclair/typebox'
import { TypeboxBrands } from '@/types/types'

export const automateImportFromWebsiteSchema = {
    description: "",
    tags: ["Leads"],
    body: Type.Object({
        brand: TypeboxBrands,
        registrationDate: Type.Optional(Type.String({ format: 'date-time' })),
        nameTitle: Type.String(),
        fullName: Type.String(),
        mobile: Type.String(),
        email: Type.String(),
        enquiry: Type.String(),
        branch: Type.String(),
        coupon: Type.String(),
        term: Type.String(),
        promotion: Type.String(),
        landing_url: Type.String(),
        uid: Type.String(),
        uip: Type.String(),
        utm_source: Type.String(),
        utm_medium: Type.String(),
        utm_campaign: Type.String(),
        utm_term: Type.String(),
        utm_content: Type.String(),
        gclid: Type.String(),
        fbclid: Type.String(),
        user_agent: Type.String(),
    }),
    response: {
        200: Type.Object({
            status: Type.String(),
        }),
    }
};