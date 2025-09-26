import {TypedFastifyInstance} from "@/types/types";
import { getTable } from "@/utils/tables";
import { AsyncTask } from 'toad-scheduler';

export function run(fastify: TypedFastifyInstance) {

    return new AsyncTask(
        '@/schedule/perfit/refresh_lead_count.service.service', async () => {

            fastify.log.info("Running perFIT - Refresh Lead Count");

            const brand = "perFIT";
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

            // Get lead counts from lead table group by Date
            const leadCounts = await fastify.mainDB
                .selectFrom(getTable(brand, "Leads"))
                .select([
                    '查詢日期',
                    fastify.mainDB.fn.countAll().as('count'),
                    fastify.mainDB.fn.count('預約到店日期').as('book_count'),
                    fastify.mainDB.fn.count('實際到店日期').as('show_count'),
                ])
                .where('查詢日期', '>=', sixMonthsAgo)
                .groupBy("查詢日期")
                .execute();

            // Update lead counts to lead count table
            for(const leadCount of leadCounts) {
                const date = leadCount["查詢日期"];
                const count = leadCount.count;
                const updated_at = new Date();

                if(!date) continue;

                const rowData = {
                    Lead__自動_: count || 0,
                    Book__自動_: leadCount.book_count || 0,
                    Show__自動_: leadCount.show_count || 0,
                    updated_at: updated_at,
                };

                const existing = await fastify.mainDB
                    .selectFrom(getTable(brand, "LeadCounts"))
                    .selectAll()
                    .where('Date__自動_', '=', date)
                    .executeTakeFirst();

                if(existing) {
                    // Update
                    await fastify.mainDB
                        .updateTable(getTable(brand, "LeadCounts"))
                        .set(rowData)
                        .where('Date__自動_', '=', date)
                        .executeTakeFirstOrThrow();
                } else {
                    // Insert
                    await fastify.mainDB
                        .insertInto(getTable(brand, "LeadCounts"))
                        .values({
                            ...rowData,
                            Date__自動_: date,
                            created_at: updated_at,
                        })
                        .executeTakeFirstOrThrow();
                }

            }

        }, (error: any) => {
            console.log(error);
        })

}