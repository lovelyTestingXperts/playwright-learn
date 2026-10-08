import {config}  from "dotenv";

config({ path: '.env' });

export const APPLICATION_ENVRIONMENT = {
    BASE_URL: process.env.BASE_URL || "",
    TEST_ENV: process.env.TEST_ENV || "",
    TEST_USERNAME: process.env.TEST_USERNAME || "",
    TEST_PASSWORD: process.env.TEST_PASSWORD || ""
}