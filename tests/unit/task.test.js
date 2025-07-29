const Task = require('../../src/models/task');

describe('Task Model', () => {
  it('devrait créer une tâche avec des champs valides', () => {
    const task = Task.build({
      title: 'Test unitaire',
      description: 'Une description',
      status: 'pending',
    });

    expect(task.title).toBe('Test unitaire');
    expect(task.status).toBe('pending');
  });
});