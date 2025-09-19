import { FastifyReplyTypebox, FastifyRequestTypebox, TypedFastifyInstance } from "@/types/types";
import { handleError } from "@/services/response";
import { catchStatisticsSchema } from "@/api/website/catch_statistics.schema";
import { catchStatistics } from "@/api/website/catch_statistics.service";

async function routes (fastify: TypedFastifyInstance, options: any) {

    fastify.post("/", { schema: catchStatisticsSchema}, async (
        request: FastifyRequestTypebox<typeof catchStatisticsSchema>,
        reply: FastifyReplyTypebox<typeof catchStatisticsSchema>
    ) => {
        try {

            // Process the request
            await catchStatistics(fastify, request, reply, request.body);

            // Send the response
            return reply.code(200).send();

        } catch (error) {
            return handleError(request, reply, error);
        }
    });

}
export default routes;