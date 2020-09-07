import { foreign } from "./data/foreign-words";
import { english } from "./data/english-words";

export const languageGenerator = async function init (players, playerTextLength) {
    const languageLength = english.length;
    const baseForeignWords = shuffleArray(foreign);
    const baseEnglishWords = shuffleArray(english);
    const generatedWords = [];
    const languageDictionaryArr = [];
    const dictionaryRefined = [];
    const playerWordsArray2D = [];
    const numberOfPlayers = players;

    for (let i = 0; i < baseForeignWords.length; i++) {
        const word = await mangleMixWords(baseForeignWords[i], baseForeignWords[i+1]);
        generatedWords.push(word)
        i++;
        if (i > languageLength) break;
    }


    for (let k = 0; k < numberOfPlayers; k++) {
        playerWordsArray2D[k] = [];
        for (let l = 0; l < playerTextLength; l++) {
            const randomIndex = (Math.floor(Math.random() * generatedWords.length));
            playerWordsArray2D[k].push(generatedWords[randomIndex]);
            if (!languageDictionaryArr.includes(generatedWords[randomIndex])) languageDictionaryArr.push(generatedWords[randomIndex]);
        }
    }

    for (let j = 0; j < languageDictionaryArr.length; j++) {
        dictionaryRefined.push(languageDictionaryArr[j].toLowerCase() + " - " + baseEnglishWords[j] + ": ▢ ▢ ▢ ▢ ▢")
    }

    return {
        dictionary: dictionaryRefined.sort(),
        playerWords: playerWordsArray2D
    }

}

function mangleMixWords (wordA, wordB) {
    return new Promise((resolve, reject) => {
        try {
            const puncts = ["", "", "", "", "", "", "", "", "", "", "", "-", "-", "'", "'"];
            const wordANum= (getRandom(3, wordA.length))
            const wordBNum = (getRandom(3, wordB.length))
            const randomArrNum = Math.round(Math.random());
            let secondWordPart = "";

            if (randomArrNum === 0) {
                if (wordB.substring(wordBNum).length > 0) secondWordPart = (puncts[Math.floor(Math.random()*puncts.length)]) + wordB.substring(wordBNum);
                resolve(wordA.substring(0, wordANum) + secondWordPart);

            }
            if (wordA.substring(wordBNum).length > 0) secondWordPart = (puncts[Math.floor(Math.random()*puncts.length)]) + wordA.substring(wordANum);
            resolve(wordB.substring(0, wordBNum) + secondWordPart);
        } catch (err) {
            reject(err);
        }
    })
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}