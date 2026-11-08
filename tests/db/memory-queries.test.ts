import { describe, it, expect } from "vitest";
import { insertMemory, getMemories, deleteMemory } from "@/lib/db/queries/memory-queries";
import { DIMENSIONS } from "../../const";

describe("Memory queries", () => {
  it("should insert and retrieve a memory", async () => {
    const content = "I enjoy long walks on the beach and watching sunsets.";

    const embedding = Array(DIMENSIONS).fill(0.1);

    const inserted = await insertMemory({
      content,
      embedding,
    });

    expect(inserted.content).toBe(content);
    expect(inserted.embedding).toHaveLength(DIMENSIONS);

    const allMemories = await getMemories();

    expect(
      allMemories.some((memory) => memory.id === inserted.id)
    ).toBe(true);

    await deleteMemory(inserted.id);
  });
});
