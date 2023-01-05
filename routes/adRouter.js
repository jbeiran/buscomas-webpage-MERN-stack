const router = require('express').Router();
const adCtrl = require('../controllers/adCtrl');

router.route('/ads')
    .get(adCtrl.getAds) 
    .post(adCtrl.createAd);

router.route('/ads/:id')
    .delete(adCtrl.deleteAd)
    .put(adCtrl.updateAd);

module.exports = router;