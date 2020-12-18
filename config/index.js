require('dotenv').config();


const mongoUrl =  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_HOST}
/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const  config = {
  dbUrl:process.env.DB_URL || mongoUrl,
  
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  host: process.env.HOST || "http://localhost",

  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  
};

module.exports = { config };
