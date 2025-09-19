import { FastifyReplyTypebox, FastifyRequestTypebox, TypedFastifyInstance } from "@/types/types";
import { handleError } from "@/services/response";
import { setAdGroupInformationSchema } from "@/api/google_ads/set_ad_group_information.schema";
import { setAdGroupInformation } from "@/api/google_ads/set_ad_group_information.service";

async function routes (fastify: TypedFastifyInstance, options: any) {

    fastify.post("/", { schema: setAdGroupInformationSchema}, async (
        request: FastifyRequestTypebox<typeof setAdGroupInformationSchema>,
        reply: FastifyReplyTypebox<typeof setAdGroupInformationSchema>
    ) => {
        try {

            // Process the request
            await setAdGroupInformation(fastify, request, reply, request.body);

            // Send the response
            return reply.code(200).send();

        } catch (error) {
            return handleError(request, reply, error);
        }
    });

}
export default routes;