import { FastifyInstance } from 'fastify';

async function routes (fastify: FastifyInstance, options: any) {

    fastify.register(import("@/api/fb_leads/get_ad_account_configs"),                  { prefix: `/get_ad_account_configs` });

    fastify.register(import("@/api/fb_leads/find_form_information_missing"),           { prefix: `/find_form_information_missing` });

    fastify.register(import("@/api/fb_leads/set_form_information"),                    { prefix: `/set_form_information` });
    fastify.register(import("@/api/fb_leads/set_ad_information"),                      { prefix: `/set_ad_information` });
    fastify.register(import("@/api/fb_leads/set_ad_insights"),                         { prefix: `/set_ad_insights` });

    fastify.register(import("@/api/fb_leads/catch_webhook"),                           { prefix: `/catch_webhook` });
}

export default routes;