import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateText, Output } from "ai";
import { extractFacts, chatModel } from "@/lib/ai/memories";

const dummyInput = "I enjoy long walks on the beach and have been learning how to code for 5 years.";

const mockFacts = [
    "Enjoys long walks on the beach",
    "Has been learning how to code for 5 years",
]

vi.mock("ai", () => ({
    generateText: vi.fn(),
    Output: {
        object: vi.fn(() => ({
            type: "object",
            schema: {},
        })),
    },
}));

describe("Memory fact extraction", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    })

    it("Should call generateText with the correct prompt and model", async () => {
        vi.mocked(generateText).mockResolvedValue({
            output: { facts: mockFacts },

        } as Awaited<ReturnType<typeof generateText>>);

        await extractFacts(dummyInput);

        expect(generateText).toHaveBeenCalledOnce();
        
        expect(generateText).toHaveBeenCalledWith(
            expect.objectContaining({
                model: chatModel,
                system: expect.any(String),
                prompt: dummyInput,
                output: expect.anything(),
            })
        );

        expect(Output.object).toHaveBeenCalledOnce();
        expect(Output.object).toHaveBeenCalledWith({
            schema: expect.anything(),
        });
    });

    it("Should return the extracted facts", async () => {
        vi.mocked(generateText).mockResolvedValue({
            output: { facts: mockFacts },

        } as Awaited<ReturnType<typeof generateText>>);

        const res = await extractFacts(dummyInput);
        expect(res).toEqual(mockFacts);
    });

    it("Should return an empty array when no facts are extracted or found", async () => {
        vi.mocked(generateText).mockResolvedValue({
            output: { facts: [] },
        } as Awaited<ReturnType<typeof generateText>>);

        const res = await extractFacts("Hello");
        expect(res).toEqual([]);
    });

    it("Should propagate errors from the AI provider", async () => {
        vi.mocked(generateText).mockRejectedValue(new Error("AI provider error"));

        await expect(extractFacts(dummyInput)).rejects.toThrow("AI provider error");
    });
})
