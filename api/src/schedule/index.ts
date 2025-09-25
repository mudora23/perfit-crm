import { TypedFastifyInstance } from '@/types/types';
import { SimpleIntervalJob, CronJob } from 'toad-scheduler';

export default async (fastify: TypedFastifyInstance) => {

    // if debug mode, do not run scheduled jobs
    if (process.env.DEBUG === 'True') {
        fastify.log.info('Debug mode is on, scheduled jobs will not run');
        return;
    }

    // wait until the server is ready
    fastify.ready().then(
        async () => {

            /*fastify.scheduler.addCronJob(new CronJob({ cronExpression: '10 8 * * * *' }, // every day at 8:10 AM
                (await import("@/schedule/perfit/fb_leads/process_ad_information.service")).run(fastify),
                { preventOverrun: true }
            ))*/

            fastify.scheduler.addSimpleIntervalJob(new SimpleIntervalJob({ seconds: 600, runImmediately: false },
                (await import("@/schedule/perfit/fb_leads/process_ad_information.service")).run(fastify)
            ))

            fastify.scheduler.addSimpleIntervalJob(new SimpleIntervalJob({ seconds: 600, runImmediately: false },
                (await import("@/schedule/perfit/fb_leads/process_ad_insights.service")).run(fastify)
            ))

            fastify.scheduler.addSimpleIntervalJob(new SimpleIntervalJob({ seconds: 600, runImmediately: false },
                (await import("@/schedule/perfit/google_ads/process_ad_group_information.service")).run(fastify)
            ))

            fastify.scheduler.addSimpleIntervalJob(new SimpleIntervalJob({ seconds: 600, runImmediately: false },
                (await import("@/schedule/perfit/google_ads/process_ad_group_report.service")).run(fastify)
            ))

        }
    )
}