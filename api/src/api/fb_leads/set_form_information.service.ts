import { FastifyRequest, FastifyReply } from "fastify";
import { Static } from '@sinclair/typebox';
import { TypedFastifyInstance } from "@/types/types";
import { setFormInformationSchema } from "@/api/fb_leads/set_form_information.schema";

export async function setFormInformation(
    fastify: TypedFastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply,
    body: Static<typeof setFormInformationSchema.body>
) {
    for (const form of body) {
        const { id, name, page_id, created_time } = form;
        const row_created_at = new Date();
        await fastify.mainDB
            .insertInto("integrations.fb_leads_form_information")
            .values({
                form_id: id,
                form_name: name,
                page_id: page_id,
                full_details: JSON.stringify(form),
                created_time: new Date(created_time),
                row_created_at: row_created_at,
                row_updated_at: row_created_at,
            })
            .executeTakeFirstOrThrow();
    }
    return { status: "OK" };
}
