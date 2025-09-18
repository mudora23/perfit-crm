import { FastifyReplyTypebox, FastifyRequestTypebox, TypedFastifyInstance } from "@/types/types";
import { handleError } from "@/services/response";
import { catchWebhookSchema } from "@/api/fb_leads/catch_webhook.schema";
import { catchWebhook } from "@/api/fb_leads/catch_webhook.service";

async function routes (fastify: TypedFastifyInstance, options: any) {

    fastify.post("/", { schema: catchWebhookSchema}, async (
        request: FastifyRequestTypebox<typeof catchWebhookSchema>,
        reply: FastifyReplyTypebox<typeof catchWebhookSchema>
    ) => {
        try {

            // Process the request
            await catchWebhook(fastify, request, reply, request.body);

            // Send the response
            return reply.code(200).send();

        } catch (error) {
            return handleError(request, reply, error);
        }
    });

}
export default routes;