import { TypedFastifyInstance } from "@/types/types";
export async function get_base_id_by_title(fastify: TypedFastifyInstance, title: string): Promise<string | null> {
    const base = await fastify.mainDB
        .selectFrom("ncBasesV2")
        .where("title", "=", String(title))
        .select("id")
        .executeTakeFirst();
    return base ? base.id : null;
}