import { FastifyRequest, FastifyReply } from "fastify";
import { Static } from '@sinclair/typebox';
import { TypedFastifyInstance } from "@/types/types";
import { findFormInformationMissingSchema } from "@/api/fb_leads/find_form_information_missing.schema";

export async function findFormInformationMissing(
    fastify: TypedFastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply,
    body: Static<typeof findFormInformationMissingSchema.body>
) {

    const existingFormIds = await fastify.mainDB
        .selectFrom("integrations.fb_leads_form_information")
        .select("form_id")
        .execute()
        .then(rows => rows.map(row => row.form_id));

    return await fastify.mainDB
        .selectFrom("integrations.fb_leads_webhook")
        .select(["form_id", "page_id"])
        .distinct()
        .execute()
        .then(rows => rows.filter(row => !existingFormIds.includes(row.form_id)));

}
