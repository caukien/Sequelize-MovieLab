const {Director, Movie} = require("../models")

exports.DirectorController = {
    getAll: async (req, res) => {
        try {
            const directors = await Director.findAll({
                attributes:{
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: Movie,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'countryId']
                    },
                    through: { attributes: [] }
                }]
            });
            res.status(200).json(directors);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
    get: async(req, res) => {
        try {
            // const { id } = req.params;
            const director = await Director.findOne(req.params);
            if (director != null) {
                res.status(200).json(director);
            } else {
                res.status(404).json({ message: "Director not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
    create: async (req, res) => {
        try {
            const checkDirector = await Director.findOne({ where: {Name: req.body.name} });
            console.log(checkDirector);
            if(checkDirector != null)
                return res.status(200).json({ message: "Director already exists" });

            const { name, birthday, des, gender, pic } = req.body;

            const newDirector = await Director.create({ name, birthday, des, gender, pic });
            return res.status(201).json(newDirector);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, birthday, des, gender, pic } = req.body;
            
            const checkDirector = await Director.findOne({ where: { id } });
            if (checkDirector !== null) {
                const [updated] = await Director.update({ name, birthday, des, gender, pic }, {
                    where: { id }
                });
                res.status(204).json(updated);
            } else {
                res.status(404).json({ message: "Director not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
    delete: async(req, res) => {
        try {
            const { id } = req.params;
            const checkDirector = await Director.findByPk(id);

            if (checkDirector != null) {
                const deleteItem = await Director.destroy({where: {id: id}})
                res.status(204).json(deleteItem);
            } else {
                res.status(404).json({ message: "Genre not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
}