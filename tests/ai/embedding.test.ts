import { describe, it, expect, vi, beforeEach } from "vitest";
import { embedMany } from "ai";
import { generateEmbeddings, embeddingModel } from "@/lib/ai/embedding";

const dummyFacts = [
    "Enjoys long walks on the beach",
    "Has been learning how to code for 5 years",
];

const mockEmbeddings = [
    Array(1536).fill(0.1),
    Array(1536).fill(0.2),
];

const factsLength = dummyFacts.length;

vi.mock("ai", () => ({
    embedMany: vi.fn(),
}));

describe("Embedding generation", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    })

    it("Should return an empty array when given no facts", async () => {
        const res = await generateEmbeddings([]);

        expect(res).toEqual([]);
        expect(embedMany).not.toHaveBeenCalled();
    })

    it("Should call embedMany with given dummy facts ", async () => {

        vi.mocked(embedMany).mockResolvedValue({
            values: dummyFacts,
            embeddings: mockEmbeddings,
            usage: {
                tokens: 10,
            },
            warnings: [],
        });

        await generateEmbeddings(dummyFacts);

        expect(embedMany).toHaveBeenCalledOnce();
        expect(embedMany).toHaveBeenCalledWith({
            model: embeddingModel,
            values: dummyFacts,
        });
    });

    it("Should return correct mapping between facts and embeddings", async () => {

        vi.mocked(embedMany).mockResolvedValue({
            values: dummyFacts,
            embeddings: mockEmbeddings,
            usage: { tokens: 10 },
            warnings: [],
        });

        const res = await generateEmbeddings(dummyFacts);

        expect(res).toHaveLength(factsLength);

        for (let i = 0; i < factsLength; i++) {
            expect(res[i]).toEqual({
                content: dummyFacts[i],
                embedding: mockEmbeddings[i],
            });
        }
    });

    it("Should propagate errors from embedding provider", async () => {

        vi.mocked(embedMany).mockRejectedValue(new Error("Embedding provider error"));

        await expect(generateEmbeddings(dummyFacts)).rejects.toThrow("Embedding provider error");
    })

})