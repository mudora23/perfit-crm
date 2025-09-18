import { FastifyReplyTypebox, FastifyRequestTypebox, TypedFastifyInstance } from "@/types/types";
import { handleError } from "@/services/response";

import { automateImportFromWebsiteSchema } from "@/api/perfit/leads/automate_import_from_website.schema";
import { automateImportFromWebsite } from "@/api/perfit/leads/automate_import_from_website.service";

async function routes (fastify: TypedFastifyInstance, options: any) {

    fastify.post("/", { schema: automateImportFromWebsiteSchema}, async (
      request: FastifyRequestTypebox<typeof automateImportFromWebsiteSchema>,
      reply: FastifyReplyTypebox<typeof automateImportFromWebsiteSchema>
    ) => {
        try {

          // Process the request
          await automateImportFromWebsite(fastify, request, reply, request.body);

          // Send the response
          return reply.code(200).send();

        } catch (error) {
          return handleError(request, reply, error);
        }
    });

}
export default routes;