const router = require('express').Router();
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Upload image only Admin can upload
router.post('/upload', auth, authAdmin, (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).send('Non è stato caricato alcun file.');

        const file = req.files.file;

        if (file.size > 1024 * 1024) { //1Mb
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: "Taglia troppo grande." })
        }

        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: "Il formato del file non è corretto." })
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "test" }, async (err, result) => {
            if (err) throw err;

            removeTmp(file.tempFilePath)

            res.json({ public_id: result.public_id, url: result.secure_url })
        })

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
})

// Delete image only Admin can delete
router.post('/destroy', auth, authAdmin, (req, res) => {
    try {
        const { public_id } = req.body;
        if (!public_id) return res.status(400).json({ msg: "Non sono state selezionate immagini." })

        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err;
            res.json({ msg: "Immagine cancellata" })
        })

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
})

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    })
}

module.exports = router;