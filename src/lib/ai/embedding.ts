import { embedMany } from "ai";
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { memories } from "@/lib/db/schema/memories";
import { db } from "@/lib/db";

export const embeddingModel = "openai/text-embedding-3-small";

/**
 * Generates vector embeddings for a list of facts
 * @param facts - list of facts regarding user dialogue
 * @returns list of mapping between facts and vector embeddings
 */
export async function generateEmbeddings(facts: string[]): Promise<Array<{ embedding: number[]; content: string }>> {

    if (facts.length === 0) return [];

    const { embeddings } = await embedMany({
        model: embeddingModel,
        values: facts,
    });

    return facts.map((content, i) => ({
        content,
        embedding: embeddings[i],
    }))
}

/**
 * Finds the most relevant facts based on a user's query
 * @param userQuery - The user's query
 * @returns - list of the top 5 facts most similar to query
 */
export async function findRelevantFacts(userQuery: string) {

    const [query] = await generateEmbeddings([userQuery]);

    const similarity = sql<number>`1 - (${cosineDistance(
        memories.embedding,
        query.embedding,
    )})`;

    const relevantFacts = await db
        .select({
            content: memories.content,
            similarity: similarity,
        })
        .from(memories)
        .where(gt(similarity, 0.5))
        .orderBy(desc(similarity))
        .limit(5);
    
    return relevantFacts;
} 