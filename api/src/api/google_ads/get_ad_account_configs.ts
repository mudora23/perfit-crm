import { FastifyReplyTypebox, FastifyRequestTypebox, TypedFastifyInstance } from "@/types/types";
import { handleError } from "@/services/response";
import { getAdAccountConfigsSchema } from "@/api/google_ads/get_ad_account_configs.schema";
import { getAdAccountConfigs } from "@/api/google_ads/get_ad_account_configs.service";

async function routes (fastify: TypedFastifyInstance, options: any) {

    fastify.post("/", { schema: getAdAccountConfigsSchema}, async (
        request: FastifyRequestTypebox<typeof getAdAccountConfigsSchema>,
        reply: FastifyReplyTypebox<typeof getAdAccountConfigsSchema>
    ) => {
        try {

            // Process the request
            const res = await getAdAccountConfigs(fastify, request, reply, request.body);

            // Send the response
            return reply.code(200).send(res);

        } catch (error) {
            return handleError(request, reply, error);
        }
    });

}
export default routes;