'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.belongsToMany(models.Genre, {through: "Movie_Genres", foreignKey: "MovieId", otherKey: 'GenreId', onDelete: 'cascade', hooks: true})
      Movie.belongsToMany(models.Director, {through: "Movie_Directors", foreignKey: "MovieId", otherKey: 'DirectorId', onDelete: 'cascade', hooks: true})
      Movie.belongsToMany(models.Actor, {through: "Movie_Actors", foreignKey: "MovieId", otherKey: 'ActorId', onDelete: 'cascade', hooks: true})
      Movie.belongsToMany(models.Country, {through: "Movie_Countries", foreignKey: "MovieId", otherKey: 'CountryId', onDelete: 'cascade', hooks: true})
      Movie.belongsToMany(models.Product, {through: "Movie_Products", foreignKey: "MovieId", otherKey: 'ProductId', onDelete: 'cascade', hooks: true})
    }
  }
  Movie.init({
    name: DataTypes.STRING,
    release: DataTypes.INTEGER,
    des: DataTypes.STRING,
    poster: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};