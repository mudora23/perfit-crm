import { FastifyReplyTypebox, FastifyRequestTypebox, TypedFastifyInstance } from "@/types/types";
import { handleError } from "@/services/response";

import { processWebsiteWebhookSchema } from "@/api/perfit/leads/process_website_webhook.schema";
import { processWebsiteWebhook } from "@/api/perfit/leads/process_website_webhook.service";

async function routes (fastify: TypedFastifyInstance, options: any) {

    fastify.post("/", { schema: processWebsiteWebhookSchema}, async (
      request: FastifyRequestTypebox<typeof processWebsiteWebhookSchema>,
      reply: FastifyReplyTypebox<typeof processWebsiteWebhookSchema>
    ) => {
        try {

          // Process the request
          await processWebsiteWebhook(fastify, request, reply, request.body);

          // Send the response
          return reply.code(200).send();

        } catch (error) {
          return handleError(request, reply, error);
        }
    });

}
export default routes;