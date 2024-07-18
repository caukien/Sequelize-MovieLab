const {Movie, Genre, Director, Actor, Country, Product} = require("../models");


exports.MovieController = {
    getAll: async (req, res) => {
        try {
            const Items = await Movie.findAll({
                attributes: {
                    exclude: ['MovieId', 'createdAt', 'updatedAt',]
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
                        model:Actor,
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
            res.status(200).json(Items);
        } catch (error) {
            // console.error('Error fetching movies:', error);
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
    get: async(req, res) => {
        try {
            const { id } = req.params;
            const Item = await Movie.findOne({
                where: {id},
                attributes: {
                    exclude: ['MovieId', 'createdAt', 'updatedAt',]
                },
                include: [
                    {
                        model: Genre,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        through: { attributes: [] }
                    },{
                        model: Director,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'birthdat', 'des', 'gender']
                        },
                        through: { attributes: [] }
                    },{
                        model:Actor,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'birthday', 'des', 'gender']
                        },
                        through: { attributes: [] }
                    }
                ]
            });
            if (Item != null) {
                res.status(200).json(Item);
            } else {
                res.status(404).json({ message: "Movie not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
    create: async (req, res) => {
        try {
            const checkExists = await Movie.findOne({ where: {name: req.body.name} })
            if(checkExists != null)
                return res.status(400).json({ message: "Movie already exists" });

            const { name, release, des, poster, genreId, directorId, actorId, countryId, productId} = req.body

            // Check if all directors exist
            const directorInstances = await Director.findAll({
                where: {
                    id: directorId
                }
            });

            if (directorInstances.length !== directorId.length) {
                return res.status(404).json({ message: "One or more directors not found" });
            }

            // Check if all genres exist
            const genreInstances = await Genre.findAll({
                where: {
                    id: genreId
                }
            });
            if (genreInstances.length !== genreId.length) {
                return res.status(404).json({ message: "One or more genres not found" });
            }

            // Check if all actors exist
            const actorInstances = await Actor.findAll({
                where: {
                    id: actorId
                }
            });

            if (actorInstances.length !== actorId.length) {
                return res.status(404).json({ message: "One or more actors not found" });
            }
            const countryInstances = await Country.findAll({
                where: {
                    id: countryId
                }
            });

            if (countryInstances.length !== countryId.length) {
                return res.status(404).json({ message: "One or more countries not found" });
            }
            const productInstances = await Product.findAll({
                where: {
                    id: productId
                }
            });

            if (productInstances.length !== productId.length) {
                return res.status(404).json({ message: "One or more products not found" });
            }
            // Add a movie
            const newItem = await Movie.create({ name, release, des, poster });
            // Add genres to the movie
            await newItem.addGenres(genreInstances);

            // Add directors to the movie
            await newItem.addDirectors(directorInstances);

            // Add actors to the movie
            await newItem.addActors(actorInstances);
            // Add countries to the movie
            
            await newItem.addProducts(productInstances);

            await newItem.addCountries(countryInstances);

            return res.status(201).json(newItem);
            
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, release, des, poster, genreId, directorId, actorId, countryId, productId } = req.body
            
            const checkExists = await Movie.findOne({ where: { id } });

            if (!checkExists) {
                return res.status(404).json({ message: "Movie not found" });
            }
    
            // Check if all directors exist
            const directorInstances = await Director.findAll({
                where: {
                    id: directorId
                }
            });

            if (directorInstances.length !== directorId.length) {
                return res.status(404).json({ message: "One or more directors not found" });
            }
    
            // Check if all genres exist
            const genreInstances = await Genre.findAll({
                where: {
                    id: genreId
                }
            });
    
            if (genreInstances.length !== genreId.length) {
                return res.status(404).json({ message: "One or more genres not found" });
            }
      
            // Check if all actors exist
            const actorInstances = await Actor.findAll({
                where: {
                    id: actorId
                }
            });
    
            if (actorInstances.length !== actorId.length) {
                return res.status(404).json({ message: "One or more actors not found" });
            }

            const countryInstances = await Country.findAll({
                where: {
                    id: countryId
                }
            });

            if (countryInstances.length !== countryId.length) {
                return res.status(404).json({ message: "One or more countries not found" });
            }
            const productInstances = await Product.findAll({
                where: {
                    id: productId
                }
            });

            if (productInstances.length !== productId.length) {
                return res.status(404).json({ message: "One or more products not found" });
            }
    
            // Update movie details
            await Movie.update({ name, release, des, poster }, { where: {id} });
    
            // Update genres for the movie
            await checkExists.setGenres(genreInstances);
    
            // Update directors for the movie
            await checkExists.setDirectors(directorInstances);
    
            // Update actors for the movie
            await checkExists.setActors(actorInstances);
            await checkExists.setProducts(productInstances);

            await checkExists.setCountries(countryInstances);
    
            return res.status(204).json({ message: "Movie updated successfully" });
            // if (checkExists !== null) {
            //     const [updated] = await Movie.update({ name, release, des, poster}, {
            //         where: { id }
            //     });
            //     res.status(204).json(updated);
            // } else {
            //     res.status(404).json({ message: "Movie not found" });
            // }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
    delete: async(req, res) => {
        try {
            const { id } = req.params;
            const checkExists = await Movie.findByPk(id);

            if (checkExists != null) {
                const deleteItem = await Movie.destroy({where: {id: id}})
                res.status(204).json(deleteItem);
            } else {
                res.status(404).json({ message: "Actor not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
}