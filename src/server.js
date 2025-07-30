  const app = require('./app');
  const sequelize = require('./sequelize');

  const PORT = process.env.PORT || 3000;

  (async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync(); // crée les tables
      console.log('DB connected');
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Unable to start the app:', error);
    }
  })();