import app from "./app";
import { env } from "./config/env";
import { testDatabaseConnection } from "./config/prisma";

async function startServer() {
    await testDatabaseConnection();

    app.listen(env.PORT, () => {
        console.log(`Server running at http://localhost:${env.PORT}`);
    });
}

startServer();