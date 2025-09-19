import { FastifyReplyTypebox, FastifyRequestTypebox, TypedFastifyInstance } from "@/types/types";
import { handleError } from "@/services/response";
import { setAdInformationSchema } from "@/api/fb_leads/set_ad_information.schema";
import { setAdInformation } from "@/api/fb_leads/set_ad_information.service";

async function routes (fastify: TypedFastifyInstance, options: any) {

    fastify.post("/", { schema: setAdInformationSchema}, async (
        request: FastifyRequestTypebox<typeof setAdInformationSchema>,
        reply: FastifyReplyTypebox<typeof setAdInformationSchema>
    ) => {
        try {

            // Process the request
            await setAdInformation(fastify, request, reply, request.body);

            // Send the response
            return reply.code(200).send();

        } catch (error) {
            return handleError(request, reply, error);
        }
    });

}
export default routes;