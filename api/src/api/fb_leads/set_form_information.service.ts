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
        const row_updated_at = new Date();

        const formData = {
            form_name: name,
            page_id: page_id,
            full_details: JSON.stringify(form),
            created_time: new Date(created_time),
            row_updated_at: row_updated_at,
        };

        // Check if the form already exists
        const isExisting = await fastify.mainDB
            .selectFrom("integrations.fb_leads_form_information")
            .where("form_id", "=", id)
            .selectAll()
            .executeTakeFirst();

        // Update if exists, otherwise insert
        if (isExisting) {
            await fastify.mainDB
                .updateTable("integrations.fb_leads_form_information")
                .set(formData)
                .where("form_id", "=", id)
                .executeTakeFirstOrThrow();
        } else {
            await fastify.mainDB
                .insertInto("integrations.fb_leads_form_information")
                .values({
                    form_id: id,
                    row_created_at: row_updated_at,
                    ...formData,
                })
                .executeTakeFirstOrThrow();
        }
    }
    return { status: "OK" };
}
