'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Director extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Director.belongsToMany(models.Movie, {through: "Movie_Directors", foreignKey: "DirectorId"})
    }
  }
  Director.init({
    name: DataTypes.STRING,
    birthday: DataTypes.DATE,
    des: DataTypes.STRING,
    gender: DataTypes.STRING,
    pic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Director',
  });
  return Director;
};