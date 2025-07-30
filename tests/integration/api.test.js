const request = require('supertest');
const { Sequelize } = require('sequelize');
const Task = require('../../src/models/task.cjs');
const app = require('../../src/app'); // ton app Express

// Base de données de test en mémoire
const sequelize = new Sequelize('sqlite::memory:', { logging: false });

beforeAll(async () => {
  Task.initModel(sequelize);
  await sequelize.sync({ force: true }); // crée la table
});

afterAll(async () => {
  await sequelize.close();
});

describe('🧪 API /api/tasks', () => {

  let createdTaskId;

  it('POST /api/tasks - crée une nouvelle tâche', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Tâche test',
        description: 'Description test',
        status: 'à faire',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    createdTaskId = res.body.id;
  });

  it('GET /api/tasks - retourne toutes les tâches', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/tasks/:id - retourne une tâche spécifique', async () => {
    const res = await request(app).get(`/api/tasks/${createdTaskId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title');
  });

  it('PUT /api/tasks/:id - met à jour une tâche', async () => {
    const res = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .send({
        title: 'Tâche modifiée',
        description: 'Mise à jour de la description',
        status: 'en cours',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Tâche modifiée');
  });

  it('DELETE /api/tasks/:id - supprime une tâche', async () => {
    const res = await request(app).delete(`/api/tasks/${createdTaskId}`);
    expect(res.statusCode).toEqual(204);
  });

  it('GET /api/tasks/:id - tâche non trouvée', async () => {
    const res = await request(app).get(`/api/tasks/${createdTaskId}`);
    expect(res.statusCode).toEqual(404);
  });

});