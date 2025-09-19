import { FastifyInstance } from 'fastify';

async function routes (fastify: FastifyInstance, options: any) {

    fastify.register(import("@/api/google_ads/get_ad_account_configs"),                { prefix: `/get_ad_account_configs` });

    fastify.register(import("@/api/google_ads/set_ad_group_information"),              { prefix: `/set_ad_group_information` });
    fastify.register(import("@/api/google_ads/set_ad_group_report"),                   { prefix: `/set_ad_group_report` });
    fastify.register(import("@/api/google_ads/set_campaign_information"),              { prefix: `/set_campaign_information` });
}

export default routes;