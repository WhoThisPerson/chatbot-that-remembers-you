export function assertTestDatabase() {

    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        throw new Error("DATABASE_URL is not defined for the testing environment");
    }

    let databaseName: string;

    try {
        databaseName = new URL(databaseUrl).pathname.slice(1);
    } catch (error) {
        throw new Error("Invalid DATABASE_URL format");
    }

    if (databaseName !== "chatbot_test") {
        throw new Error(`Expected database name to be "chatbot_test", but got "${databaseName}"`);
    }
}
