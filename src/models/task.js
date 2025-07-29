// models/task.js
const { Model, DataTypes } = require('sequelize');

class Task extends Model {
  static initModel(sequelize) {
    Task.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      status: {
        type: DataTypes.STRING,
        defaultValue: 'à faire',
      },
    }, {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      timestamps: true,
    });
  }
}

module.exports = Task;