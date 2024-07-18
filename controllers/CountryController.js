const {Country, Movie} = require("../models")

exports.CountryController = {
    getall: async(req, res) => {
        try {
            const Items = await Country.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt',]
                },
                include: [{
                    model: Movie,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    through: { attributes: [] }
                }]
            });
            res.status(200).json(Items);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
    get: async(req, res) => {
        try {
            // const { id } = req.params;
            const Item = await Country.findOne(req.params);
            if (Item != null) {
                res.status(200).json(Item);
            } else {
                res.status(404).json({ message: "Genre not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
    create: async (req, res) => {
        try {
            const checkItem = await Country.findOne({ where: {name: req.body.name} });
            if(checkItem != null)
                return res.status(200).json({ message: "Country already exists" });
            const newItem = await Country.create({name: req.body.name});
            return res.status(201).json(newItem);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
    update: async(req, res) => {
        try {
            const { id } = req.params;
            const Item = await Country.findByPk(id);
            
            if (Item != null) {
                const updategenre = await Country.update({name: req.body.name}, {where: {id: id}})
                res.status(204).json(Item);
            } else {
                res.status(404).json({ message: "Country not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
    delete: async(req, res) => {
        try {
            const { id } = req.params;
            const Item = await Country.findByPk(id);

            if (Item != null) {
                const Item = await Country.destroy({where: {id: id}})
                res.status(204).json(Item);
            } else {
                res.status(404).json({ message: "Country not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
}