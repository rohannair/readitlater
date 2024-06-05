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
	.get("/", (c) => {
		return c.text("Hello Hono!");
	})
	.post("/url", zValidator("json", urlSchema), async (c) => {
		const { url } = c.req.valid("json");
		const { id } = await queueScrape({ url });
		return c.json({ message: "Scraping started", id: id });
	});
