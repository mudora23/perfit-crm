import { FastifyReplyTypebox, FastifyRequestTypebox, TypedFastifyInstance } from "@/types/types";
import { handleError } from "@/services/response";

import { processAdInformationSchema } from "@/api/perfit/fb_leads/process_ad_information.schema";
import { processAdInformation } from "@/api/perfit/fb_leads/process_ad_information.service";

async function routes (fastify: TypedFastifyInstance, options: any) {

    fastify.post("/", { schema: processAdInformationSchema}, async (
      request: FastifyRequestTypebox<typeof processAdInformationSchema>,
      reply: FastifyReplyTypebox<typeof processAdInformationSchema>
    ) => {
        try {

          // Process the request
          const res = await processAdInformation(fastify, request, reply, request.body);

          // Send the response
          return reply.code(200).send(res);

        } catch (error) {
          return handleError(request, reply, error);
        }
    });

}
export default routes;