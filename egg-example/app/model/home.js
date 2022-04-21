'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const Home = app.model.define('home', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: STRING(30),
        age: INTEGER,
        createdAt: DATE,
        updatedAt: DATE,
    }, {
        freezeTableName: true,
        underscored: true,
    });

    return Home;
};