const { Movie, Genre, Director, Actor, Country, Product } = require('../models');
const { Op } = require("sequelize");

const getAllMovies = async ({page, limit, name, ...query}) => {
  try {
    const queries = {raw: true, nest: true}
    const offset = (!page || +page <= 1) ? 0 : (+page + 1);
    const flimit = +limit || 5

    queries.offset = offset * flimit;
    queries.limit = flimit;
    if(name) query.name = {[Op.substring]: name}

    const movies = await Movie.findAndCountAll({
      where: query,
      ...queries,
      attributes: {
        exclude: ['MovieId', 'createdAt', 'updatedAt']
      },
      include: [
        {
          model: Genre,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          through: { attributes: [] }
        },
        {
          model: Director,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'birthdat', 'des', 'gender', 'pic']
          },
          through: { attributes: [] }
        },
        {
          model: Actor,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'birthday', 'des', 'gender']
          },
          through: { attributes: [] }
        },
        {
          model: Country,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          through: { attributes: [] }
        },
        {
          model: Product,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          through: { attributes: [] }
        },
      ]
    });
      
      return {
        movies
    };
  } catch (error) {
    throw new Error('Error fetching movies');
  }
};

module.exports = {
  getAllMovies,
};