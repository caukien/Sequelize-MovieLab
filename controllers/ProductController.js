const {Product, Movie} = require("../models")

exports.ProductController = {
    getall: async(req, res) => {
        try {
            const Items = await Product.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
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
            const Item = await Product.findOne({
                where: req.params,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: Movie,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    through: { attributes: [] }
                }]
            });
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
            const checkItem = await Product.findOne({ where: {name: req.body.name} });
            if(checkItem != null)
                return res.status(200).json({ message: "Product already exists" });
            const newItem = await Product.create({name: req.body.name});
            return res.status(201).json(newItem);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
    update: async(req, res) => {
        try {
            const { id } = req.params;
            const Item = await Product.findByPk(id);
            
            if (Item != null) {
                const updategenre = await Product.update({name: req.body.name}, {where: {id: id}})
                res.status(204).json(Item);
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
    delete: async(req, res) => {
        try {
            const { id } = req.params;
            const Item = await Product.findByPk(id);

            if (Item != null) {
                const Item = await Product.destroy({where: {id: id}})
                res.status(204).json(Item);
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
}