/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = {};
    let tmpStorage = [];
    let bank = [];
    for(let i = 0; i < this.words.length; i++){
      if(bank.includes(this.words[i]) == false){
        bank.push(this.words[i]);
        for(let y = 0; y < this.words.length; y++){
          if(this.words[y] == this.words[i]){
            tmpStorage.push(this.words[y + 1])
          }
        }
        chains[this.words[i]] = tmpStorage;
        tmpStorage = [];
      }
    }
    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Object.keys(this.chains);
    let tmpArray = [];
    tmpArray.push(keys[0]);
    for(let i = 0; i < numWords; i++){
      if(this.chains[tmpArray[i]] != undefined){
        let random = getRandomNextWord(this.chains[tmpArray[i]].length);
        tmpArray.push(this.chains[tmpArray[i]][random]);
      } else {
        let returnString = tmpArray.join(' ');
        return returnString
      }
      }
      let returnString = tmpArray.join(' ');
      return returnString;
    }
}

function getRandomNextWord(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = { MarkovMachine };
