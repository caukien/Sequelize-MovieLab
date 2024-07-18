const { Genre, Movie } = require("../models")

exports.GenreController = {
    getall: async(req, res) => {
        try {
            const genres = await Genre.findAll({
                attributes: {
                    exclude: ['GenreId', 'createdAt', 'updatedAt',]
                },
                include: [{
                    model: Movie,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'countryId']
                    },
                    through: { attributes: [] }
                }]
            });
            res.status(200).json(genres);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
    get: async(req, res) => {
        try {
            // const { id } = req.params;
            const genreItem = await Genre.findOne(req.params);
            if (genreItem != null) {
                res.status(200).json(genreItem);
            } else {
                res.status(404).json({ message: "Genre not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
    create: async (req, res) => {
        try {
            const checkGenre = await Genre.findOne({ where: {Name: req.body.name} });
            if(checkGenre != null)
                return res.status(200).json({ message: "Genre already exists" });
            const newGenre = await Genre.create({Name: req.body.name});
            return res.status(201).json(newGenre);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
    update: async(req, res) => {
        try {
            const { id } = req.params;
            const genreItem = await Genre.findByPk(id);
            
            if (genreItem != null) {
                const updategenre = await Genre.update({Name: req.body.name}, {where: {id: id}})
                res.status(204).json(updategenre);
            } else {
                res.status(404).json({ message: "Genre not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
    delete: async(req, res) => {
        try {
            const { id } = req.params;
            const genreItem = await Genre.findByPk(id);

            if (genreItem != null) {
                const updategenre = await Genre.destroy({where: {id: id}})
                res.status(204).json(updategenre);
            } else {
                res.status(404).json({ message: "Genre not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
}