const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const countriesDB = require("./src/controllers/countriesDB")


conn.sync({ alter: true }).then(() => {
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  countriesDB()
})
}).catch(error => console.error(error))

