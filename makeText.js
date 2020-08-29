/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const stripHtml = require("string-strip-html");

const { MarkovMachine } = require('./markov');


if(process.argv[2]== 'file'){
    console.log(`.....generated text from file ${process.argv[3]}`);
        fs.readFile(process.argv[3],'utf8', (err, data) => {
            if (err) throw err;
            let markov = new MarkovMachine(data);
            console.log(markov.makeText());
            })
   }
else if(process.argv[2]=='url') {
    console.log(`.....generated text from website at ${process.argv[3]}`);
    getWebData(process.argv[3]);
}


async function getWebData(url){
    let page = await axios.get(url);
    let cleanedPage = stripHtml(page.data).result;
    let markov = new MarkovMachine(cleanedPage);
    console.log(markov.makeText());
}