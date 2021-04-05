import express from 'express';

import util from 'util';
import * as cards from '../models/cards-fs.mjs';
import * as rfid from '../models/rfid-mgr.mjs';

export const router = express.Router();
/* GET users listing. */
router.get('/add', function(req, res, next) {
    res.render('cardcreate',{
        title: "Add a Card",
        cardkey: "",
    });
});
router.post('/save', async (req, res, next) => {
    var card;
    card = await cards.create(req.body.cardkey);
    res.redirect('/');
});

router.post('/readrfid',    (req, res, next) => {
    const rfid_number = rfid.readRFID()
    console.log("rfid_number: " + rfid_number)
    res.json({"rfid": rfid_number?rfid_number:"0"});
});

router.get('/destroy', async (req, res, next) => {
    var card;
    card = await cards.read(req.query.cardkey);
    res.render('carddestroy', {title:card?card.key:"", cardkey:req.query.cardkey, card:card});
});
router.post('/destroy/confirm', async (req,res,next)=>{
    await cards.destroy(req.body.cardkey);
    res.redirect('/')
});

