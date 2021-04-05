import fs from 'fs-extra';
import path from 'path';
import util from 'util';
import Card from './card.mjs';
import DBG from 'debug';
const debug = DBG('cards:cards-fs');
const error = DBG('cards:error-fs');
var cards = [];

async function cardsDir(){
    const dir = process.env.CARDS_FS_DIR || "/home/pi/Desktop/";
    await fs.ensureDir(dir);
    return dir;
}
function filePath(cardsdir){
    return path.join(cardsdir,'codes.txt')
}
async function readFile(cardsdir){
    const readFrom = filePath(cardsdir);
    var data = await fs.readFile(readFrom,'utf8');
    data.split(/\r?\n/).forEach(element => {if (element) cards[element] = Card.fromFile(element)});
}

async function saveFile(cardsdir, cards) {
    var writeText = "";
    const writeTo = filePath(cardsdir);
    cards.forEach((element) => writeText = element.key!==""?writeText.concat(element.key,'\n'):writeText);
    await fs.writeFile(writeTo, writeText, 'utf8');
}

export async function create(key){
    var cardsdir = await cardsDir();
    await readFile(cardsdir);
    cards[key] = new Card(key);
    await saveFile(cardsdir, cards);
    return cards[key];
}

export async function read(key){
    var cardsdir = await cardsDir();
    await readFile(cardsdir);
    if(cards[key]) return cards[key];
}

export async function destroy(key){
    var cardsdir = await cardsDir();
    await readFile(cardsdir);
    if (cards[key]){
        delete cards[key];
        await saveFile(cardsdir, cards);
    }
}

export async function cardlist(){
    var cardsdir = await cardsDir();
    await readFile(cardsdir);
    return Object.keys(cards);
}
