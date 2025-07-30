import 'dotenv/config';
import { Sequelize } from 'sequelize';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const Task = require('./models/task.cjs');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
});

const seedTasks = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base réussie.');

    // Initialisation du modèle avec la connexion sequelize
    Task.initModel(sequelize);

    // Synchroniser la base en forçant la recréation des tables
    await sequelize.sync({ force: true });
    console.log('Tables recréées.');

    const tasks = [
      { title: 'Tâche 1', description: 'Faire les courses', status: 'à faire' },
      { title: 'Tâche 2', description: 'Lire un livre', status: 'fait' },
      { title: 'Tâche 3', description: 'Coder une API', status: 'à faire' },
      { title: 'Tâche 4', description: 'Aller courir', status: 'fait' },
    ];

    // Insérer les tâches en base
    await Task.bulkCreate(tasks);
    console.log('Données de test insérées avec succès.');

    process.exit(0);
  } catch (error) {
    console.error('Erreur de seed :', error);
    process.exit(1);
  }
};

seedTasks();