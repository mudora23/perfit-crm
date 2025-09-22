import { FastifyReplyTypebox, FastifyRequestTypebox, TypedFastifyInstance } from "@/types/types";
import { handleError } from "@/services/response";
import { setAdInsightsSchema } from "@/api/fb_leads/set_ad_insights.schema";
import { setAdInsights } from "@/api/fb_leads/set_ad_insights.service";

async function routes (fastify: TypedFastifyInstance, options: any) {

    fastify.post("/", { schema: setAdInsightsSchema}, async (
        request: FastifyRequestTypebox<typeof setAdInsightsSchema>,
        reply: FastifyReplyTypebox<typeof setAdInsightsSchema>
    ) => {
        try {

            // Process the request
            await setAdInsights(fastify, request, reply, request.body);

            // Send the response
            return reply.code(200).send();

        } catch (error) {
            return handleError(request, reply, error);
        }
    });

}
export default routes;