const Category = require('../models/categoryModel');
const Ads = require('../models/adModel');

const categoryCtrl = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find();
            res.json(categories);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createCategory: async (req, res) => {
        try{
            const {name} = req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg: 'Questa categoria esiste già.'})

            const newCategory = new Category({name})

            await newCategory.save()
            res.json({msg: "Creazione di una categoria"})

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const ads = await Ads.findOne({category: req.params.id})
            if(ads) return res.status(400).json({
                msg: "Si prega di eliminare tutti gli annunci con una relazione."
            })

            await Category.findByIdAndDelete(req.params.id)
            res.json({msg: "Eliminazione di una categoria"})
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Aggiornamento di una categoria"})
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}


module.exports = categoryCtrl;