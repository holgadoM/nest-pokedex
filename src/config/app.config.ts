export const EnvConfiguration = () => ({
    enviroment : process.env.NODE_ENV || 'dev',
    mongodb: process.env.STRING_CONEXION_MONGO,
    port: process.env.PORT || 3002,
    defaultLimit: +process.env.DEFAULT_LIMIT || 7
})