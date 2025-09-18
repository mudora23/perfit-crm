import 'module-alias/register';
import buildServer from "@/server";

const start = async () => {
  const fastify = await buildServer();
  try {
    await fastify.listen({ host: "0.0.0.0", port: 8000 })
    fastify.log.info(`API Docs: http://localhost:8000/docs`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()