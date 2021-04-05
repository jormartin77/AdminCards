import express from 'express';
import * as cards from '../models/cards-fs.mjs';

export const router = express.Router();
/* GET home page. */
router.get('/', async function(req, res, next) {
  let keylist = await cards.cardlist();
  let keyPromises = keylist.map(key=>{
    return cards.read(key);
  });
  let cardlist = await Promise.all(keyPromises);
  res.render('index', { title: 'Cards', cardlist: cardlist });
});


