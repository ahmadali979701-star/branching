const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mydb", "admin", "admin123", {
  host: "localhost",
  dialect: "postgres",
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
}

testConnection();