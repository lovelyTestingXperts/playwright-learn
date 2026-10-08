import { APPLICATION_ENVRIONMENT } from "../config/env.config"

export const VALID_USER = {
    "email": APPLICATION_ENVRIONMENT.TEST_USERNAME || "",
    "password": APPLICATION_ENVRIONMENT.TEST_PASSWORD || ""
}

export const INVALID_USER = {
    "email": "invalid_user",
    "password": "invalid_password"
}

