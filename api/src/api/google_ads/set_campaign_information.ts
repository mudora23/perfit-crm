import { FastifyReplyTypebox, FastifyRequestTypebox, TypedFastifyInstance } from "@/types/types";
import { handleError } from "@/services/response";
import { setCampaignInformationSchema } from "@/api/google_ads/set_campaign_information.schema";
import { setCampaignInformation } from "@/api/google_ads/set_campaign_information.service";

async function routes (fastify: TypedFastifyInstance, options: any) {

    fastify.post("/", { schema: setCampaignInformationSchema}, async (
        request: FastifyRequestTypebox<typeof setCampaignInformationSchema>,
        reply: FastifyReplyTypebox<typeof setCampaignInformationSchema>
    ) => {
        try {

            // Process the request
            await setCampaignInformation(fastify, request, reply, request.body);

            // Send the response
            return reply.code(200).send();

        } catch (error) {
            return handleError(request, reply, error);
        }
    });

}
export default routes;