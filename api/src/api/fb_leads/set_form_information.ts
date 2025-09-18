import { FastifyReplyTypebox, FastifyRequestTypebox, TypedFastifyInstance } from "@/types/types";
import { handleError } from "@/services/response";
import { setFormInformationSchema } from "@/api/fb_leads/set_form_information.schema";
import { setFormInformation } from "@/api/fb_leads/set_form_information.service";

async function routes (fastify: TypedFastifyInstance, options: any) {

    fastify.post("/", { schema: setFormInformationSchema}, async (
        request: FastifyRequestTypebox<typeof setFormInformationSchema>,
        reply: FastifyReplyTypebox<typeof setFormInformationSchema>
    ) => {
        try {

            // Process the request
            await setFormInformation(fastify, request, reply, request.body);

            // Send the response
            return reply.code(200).send();

        } catch (error) {
            return handleError(request, reply, error);
        }
    });

}
export default routes;