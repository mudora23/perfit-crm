import { FastifyReplyTypebox, FastifyRequestTypebox, TypedFastifyInstance } from "@/types/types";
import { handleError } from "@/services/response";

import { fbLeadWebhookSchema } from "@/api/catch/fb_lead_webhook.schema";
import { catchFbLeadWebhook } from "@/api/catch/fb_lead_webhook.service";

async function routes (fastify: TypedFastifyInstance, options: any) {

    fastify.post("/", { schema: fbLeadWebhookSchema}, async (
        request: FastifyRequestTypebox<typeof fbLeadWebhookSchema>,
        reply: FastifyReplyTypebox<typeof fbLeadWebhookSchema>
    ) => {
        try {

            // Process the request
            await catchFbLeadWebhook(fastify, request, reply, request.body);

            // Send the response
            return reply.code(200).send();

        } catch (error) {
            return handleError(request, reply, error);
        }
    });

}
export default routes;