import { describe, it, expect } from "vitest";
import { insertMemory, getMemories, deleteMemory } from "@/lib/db/queries/memory-queries";
import { DIMENSIONS } from "../../const";

const EMBEDDING = Array(DIMENSIONS).fill(0.1);

describe("Memory queries", () => {
    it("should insert and retrieve a memory", async () => {
        const content = "I enjoy long walks on the beach and watching sunsets.";

        const inserted = await insertMemory({
            content,
            embedding: EMBEDDING,
        });

        expect(inserted.content).toBe(content);
        expect(inserted.embedding).toHaveLength(DIMENSIONS);

        const allMemories = await getMemories();

        expect(
            allMemories.some((memory) => memory.id === inserted.id)
        ).toBe(true);

        await deleteMemory(inserted.id);
    });

    it("should delete a memory", async () => {
        const content = "Memory to be deleted";

        const inserted = await insertMemory({
            content,
            embedding: EMBEDDING,
        });

        expect(inserted.content).toBe(content);
        expect(inserted.embedding).toHaveLength(DIMENSIONS);

        const deleted = await deleteMemory(inserted.id);

        expect(deleted).toBe(true);

        const allMemories = await getMemories();
        
        expect(
            allMemories.some((memory) => memory.id === inserted.id)
        ).toBe(false);
    })

});
