import  Card from './card.mjs';


export async function create(key){
    cards[key] = new Card(key);
    return cards[key];
}

export async function read(key){
    if(cards[key]) return cards[key];
}

export async function destroy(key){
  if (cards[key]){
      delete cards[key];
  }
}

export async function cardlist(){
  return Object.keys(cards);
}

export async function count(){
  return cards.length;
}

export async function close(){};
