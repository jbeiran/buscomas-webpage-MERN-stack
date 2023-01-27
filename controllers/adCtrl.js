const Ads = require('../models/adModel');

// Filter, sorting and paginating
class APIfeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filtering(){
        const queryObj = {...this.queryString} // queryString = req.query

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr))

        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const adCtrl = {
    getAds: async (req, res) => {
        try {
            const features = new APIfeatures(Ads.find(), req.query)
            .filtering().sorting().paginating()

            const ads = await features.query;
            res.json({
                status: 'success',
                result: ads.length,
                ads: ads
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createAd: async (req, res) => {
        try{
            const { title, description, province, phone, phone2, phone3, phone4, phone5, content, images, category, zone, date } = req.body;
            if(!validatephone(phone)) return res.status(400).json({ msg: "Numero di telefono non valido." });
            if(!images) return res.status(400).json({ msg: "Nessun caricamento di immagini" });

            const ad = await Ads.findOne({
                title: title.toLowerCase()
            });

            if(ad) return res.status(400).json({ msg: "Questo annuncio esiste già." });

            const newAd = new Ads({
                title: title.toLowerCase(), description, province, phone, phone2, phone3, phone4, phone5, content, images, category, zone, date
            });

            await newAd.save();
            res.json({ msg: "Creazione di un annuncio." });


        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteAd: async (req, res) => {
        try{
            await Ads.findByIdAndDelete(req.params.id);
            res.json({ msg: "Eliminato un annuncio" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateAd: async (req, res) => {
        try{
            const { title, description, province, phone, phone2, phone3, phone4, phone5, content, images, category, zone, date } = req.body;
            if(!validatephone(phone)) return res.status(400).json({ msg: "Numero di telefono non valido." });
            if(!images) return res.status(400).json({ msg: "Nessun caricamento di immagini" });

            await Ads.findOneAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(), description, province, phone, phone2, phone3, phone4, phone5, content, images, zone, category, date
            });

            res.json({ msg: "Aggiornamento di un annuncio" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

const validatephone = (phones) => {
    const re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
    return re.test(phones);
}

module.exports = adCtrl;
