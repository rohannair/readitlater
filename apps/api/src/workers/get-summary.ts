import { summarizeDocument } from "@/lib/ai";
import { client, db } from "@/lib/db";
import { createLinkRepository } from "@/lib/db/repositories/links.repository";
import { task, logger } from "@trigger.dev/sdk/v3";

type GetSummaryInput = {
  id: string;
  document: string;
};

export const getSummary = task({
  id: "get-summary",
  queue: {
    concurrencyLimit: 3,
  },
  retry: {
    maxAttempts: 2,
  },
  onStart: async ({ id }: GetSummaryInput) => {
    await createLinkRepository(db).updateLink({
      id,
      status: "processing",
    });
  },
  run: async ({ id, document }: GetSummaryInput) => {
    logger.info(`Processing link with id: ${id}`);
    const summary = await summarizeDocument(document);
    logger.info(`Success: summary processed for link with id: ${id}`);

    await createLinkRepository(db).updateLink({
      id,
      summary,
      status: "completed",
    });
  },
  onFailure: async ({ id }: GetSummaryInput) => {
    await createLinkRepository(db).updateLink({
      id,
      status: "error",
    });
  },
});
