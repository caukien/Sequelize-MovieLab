'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Actor.belongsToMany(models.Movie, {through: "Movie_Actors", foreignKey: "ActorId", otherKey: 'MovieId', onDelete: 'cascade', hooks: true})
    }
  }
  Actor.init({
    name: DataTypes.STRING,
    birthday: DataTypes.DATE,
    des: DataTypes.STRING,
    gender: DataTypes.STRING,
    pic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Actor',
  });
  return Actor;
};