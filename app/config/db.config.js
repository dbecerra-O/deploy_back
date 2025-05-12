import dotenv from 'dotenv';
dotenv.config();

export default {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "postgres",
    PASSWORD: process.env.DB_PASSWORD || "",
    DB: process.env.DB_NAME || "bd_farmacia",
    PORT: process.env.DB_PORT || 5432,
    dialect: "postgres",
    pool: {
        max: parseInt(process.env.DB_POOL_MAX || "5"),
        min: parseInt(process.env.DB_POOL_MIN || "0"),
        acquire: parseInt(process.env.DB_POOL_ACQUIRE || "30000"),
        idle: parseInt(process.env.DB_POOL_IDLE || "10000")
    },
    // Aquí está el cambio importante - forzar SSL sin condiciones
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
};