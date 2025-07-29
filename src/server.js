const app = require('./app');
const sequelize = require('./sequelize');

const PORT = 3000;
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // auto-create tables
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Unable to start:', err);
  }
})();
