const _card_key = Symbol('key');

export default class Card{
  constructor(key) {
      this[_card_key] = key;
  }
  get key() {return this[_card_key];}
  set key(newKey) {this[_card_key] = newKey;}
  static fromFile(cardText){
      var card = new Card(cardText);
      return card;
  }
};
