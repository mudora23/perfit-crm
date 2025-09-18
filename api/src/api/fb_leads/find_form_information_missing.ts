import { FastifyReplyTypebox, FastifyRequestTypebox, TypedFastifyInstance } from "@/types/types";
import { handleError } from "@/services/response";
import { findFormInformationMissingSchema } from "@/api/fb_leads/find_form_information_missing.schema";
import { findFormInformationMissing } from "@/api/fb_leads/find_form_information_missing.service";

async function routes (fastify: TypedFastifyInstance, options: any) {

    fastify.post("/", { schema: findFormInformationMissingSchema}, async (
        request: FastifyRequestTypebox<typeof findFormInformationMissingSchema>,
        reply: FastifyReplyTypebox<typeof findFormInformationMissingSchema>
    ) => {
        try {

            // Process the request
            const res = await findFormInformationMissing(fastify, request, reply, request.body);

            // Send the response
            return reply.code(200).send(res);

        } catch (error) {
            return handleError(request, reply, error);
        }
    });

}
export default routes;