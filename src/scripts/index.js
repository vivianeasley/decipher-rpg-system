import { jsPDF } from "jspdf";
import { languageGenerator } from "./modules/language-generator";
import {
    playerCanvasGenerator,
    gmStoryCanvasGenerator,
    translationCanvasGenerator
 } from "./modules/canvas-generators";

window.onload = function() {
    init();
};
async function init (players, playerTextLength) {
    const downloadPDFNode = document.querySelector(".saveText");
    downloadPDFNode.addEventListener("click", buildPDF, false);

    const dataUrlImageArray = [];
    const numberOfPLayers = getNumberOfPlayers();
    if (!numberOfPLayers) return;

    // Generate language
    const languageObject = await languageGenerator(8, 50);

    // Generate GM intro dataURL images
    const gmIntroCanvasNode = await gmStoryCanvasGenerator();
    const gmIntroImageDataURL = await canvasToDatURL(gmIntroCanvasNode);
    dataUrlImageArray.push(gmIntroImageDataURL);

    // Generate GM translation dataURL images
    const translationCanvasNodesArr = await translationCanvasGenerator(languageObject.dictionary);
    for (let index = 0; index < translationCanvasNodesArr.length; index++) {
        const translationImageDataURL = await canvasToDatURL(translationCanvasNodesArr[index]);
        dataUrlImageArray.push(translationImageDataURL);
    }

    // Generate players sheets dataURL images
    for (let i = 0; i < languageObject.playerWords.length; i++) {
        const playerCanvasNode = await playerCanvasGenerator(languageObject.playerWords[i]);
        const playerImageDataURL = await canvasToDatURL(playerCanvasNode);
        dataUrlImageArray.push(playerImageDataURL);
    }

    downloadPDFNode.style.display = "inline-block";

    function buildPDF () {
        var pdf = new jsPDF('p', 'pt');

        for (var i = 0; i < dataUrlImageArray.length; i++) {
            pdf.addPage();
            pdf.setPage(i+1);
            pdf.addImage(dataUrlImageArray[i], 'JPG', 0, 0, 612, 791);
        }

        pdf.save('cipher-rpg.pdf');

    }

}


function getNumberOfPlayers () {
    const playersInputNode = document.querySelector(".inputPlayers");
    if (isNaN(playersInputNode.value) === true) {
        alert("Number of players must be a number!");
        return;
    }

    if (playersInputNode.value < 1) {
        alert("Number of players must be greater than 0!");
        return;
    }

    if (playersInputNode.value > 9) {
        alert("Number of players must be less than 10!");
        return;
    }

    return playersInputNode.value;

}

function canvasToDatURL (canvasNode) {
    return new Promise((resolve, reject) => {
        try {
            var finalImage = canvasNode.toDataURL("image/jpeg", 1.0);
            resolve(finalImage);

        } catch (err) {
            reject(err);
        }
    })
}