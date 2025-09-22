import { FastifyReplyTypebox, FastifyRequestTypebox, TypedFastifyInstance } from "@/types/types";
import { handleError } from "@/services/response";
import { setAdGroupReportSchema } from "@/api/google_ads/set_ad_group_report.schema";
import { setAdGroupReport } from "@/api/google_ads/set_ad_group_report.service";

async function routes (fastify: TypedFastifyInstance, options: any) {

    fastify.post("/", { schema: setAdGroupReportSchema}, async (
        request: FastifyRequestTypebox<typeof setAdGroupReportSchema>,
        reply: FastifyReplyTypebox<typeof setAdGroupReportSchema>
    ) => {
        try {

            // Process the request
            await setAdGroupReport(fastify, request, reply, request.body);

            // Send the response
            return reply.code(200).send();

        } catch (error) {
            return handleError(request, reply, error);
        }
    });

}
export default routes;