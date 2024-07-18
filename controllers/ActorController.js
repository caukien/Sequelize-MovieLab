const {Actor, Movie} = require("../models")
const cloudinary = require('cloudinary').v2;

exports.ActorController = {
    getAll: async (req, res) => {
        try {
            const Items = await Actor.findAll({
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
            res.status(200).json(Items);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
    get: async(req, res) => {
        try {
            const { id } = req.params;
            const Item = await Actor.findOne({where: {id}});
            if (Item != null) {
                res.status(200).json(Item);
            } else {
                res.status(404).json({ message: "Actor not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
    create: async (req, res) => {
        try {
            const file = req.file

            const { name, birthday, des, gender} = req.body;

            const checkExists = await Actor.findOne({ where: {Name: req.body.name} })

            if(checkExists != null){
                await cloudinary.uploader.destroy(file.filename);
                return res.status(200).json({ message: "Actor already exists" });
            }
            
            const newItem = await Actor.create({ name, birthday, des, gender, pic: file?.path});
            return res.status(201).json(newItem);
        } catch (error) {
            if(req.file){
                await cloudinary.uploader.destroy(req.file.filename);
            }
            return res.status(500).json({ message: "Something went wrong", error });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, birthday, des, gender, pic } = req.body;
            
            const checkExists = await Actor.findOne({ where: { id } });
            if (checkExists !== null) {
                const [updated] = await Actor.update({ name, birthday, des, gender, pic }, {
                    where: { id }
                });
                res.status(204).json(updated);
            } else {
                res.status(404).json({ message: "Actor not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error: error.map() });
        }
    },
    delete: async(req, res) => {
        try {
            const { id } = req.params;
            const checkExists = await Actor.findByPk(id);

            if (checkExists != null) {
                const deleteItem = await Actor.destroy({where: {id: id}})
                res.status(204).json(deleteItem);
            } else {
                res.status(404).json({ message: "Actor not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },
}