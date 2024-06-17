import { app } from './app'

async function main() {
  const server = await Bun.serve({
    fetch: app.fetch,
  })

  console.log(`🚀 Server started at ${server.url}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
