'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie_Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie_Country.init({
    MovieId: DataTypes.INTEGER,
    CountryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie_Country',
  });
  return Movie_Country;
};