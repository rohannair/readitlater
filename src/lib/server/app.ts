import { Hono } from "hono";
import { logger } from "hono/logger";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { queueScrape } from "./scraper/queueScrape";

const urlSchema = z.object({
	url: z.string().url(),
});

export const app = new Hono();
export type AppType = typeof app;

app.use(logger());

app
	.get("/", (c) => c.text("Hello World!"))
	.get("/health", (c) =>
		c.json({ message: "Healthy", uptime: process.uptime() }),
	)
	.post("/url", zValidator("json", urlSchema), async (c) => {
		const { url } = c.req.valid("json");
		const { id } = await queueScrape({ url });
		return c.json({ message: "Scraping started", id: id });
	});
