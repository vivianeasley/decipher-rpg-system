import { title, boggleHortsStoryIntro } from "./data/bogglehorts";
import { rules } from "./data/rules";
import canvasTxt from 'canvas-txt'

const pdfBkgrndImage = document.querySelector(".pdfBkgrndImage");

export const playerCanvasGenerator = async function playerCanvasGenerator (playerText) {
    return new Promise((resolve, reject) => {
        try {
            //Create Canvas
            var canvasElement    = createCanvas();
            var context          = canvasElement.getContext("2d");
            context.fillStyle    = '#fff';
            context.fillRect(0, 0, 675, 900);

            context.drawImage(pdfBkgrndImage, 10, 15, 625, 450);
            context.strokeStyle = "rgba(80, 80, 80, 0.4)";
            context.strokeRect(35, 490, 580, 340);

            context.font = "Eagle Lake";
            context.fontSize = "20";
            context.fillStyle = "rgba(80, 80, 80, 0.8)";

            canvasTxt.drawText(context, "Notes:", 55, 525, 500, 10);

            var textArray = playerText.join("  ");
            canvasTxt.lineHeight = 30;
            canvasTxt.align = "left";
            canvasTxt.fontSize = 16;
            canvasTxt.drawText(context, textArray, 100, 110, 440, 200)

            resolve(canvasElement);

        } catch (err) {
            reject(err);
        }
    })
}

export const gmStoryCanvasGenerator = async function gmStoryCanvasGenerator (playerText) {
    return new Promise((resolve, reject) => {
        try {
          //Create Canvas
          var canvasElement    = createCanvas();
          var context          = canvasElement.getContext("2d");
          context.fillStyle    = '#fff';
          context.fillRect(0, 0, 675, 900);

          //Sqaures
          context.strokeStyle = "rgba(80, 80, 80, 0.4)";
          context.strokeRect(35, 100, 595, 350);
          context.strokeRect(35, 470, 595, 350);


          //Title
          canvasTxt.font = "Eagle Lake";
          canvasTxt.fontSize = "24";
          context.fillStyle = "rgba(80, 80, 80, 1)";
          canvasTxt.align = "left";
          canvasTxt.drawText(context, title, 50, 80, 500, 10);

          //Intro text
          canvasTxt.fontSize = "11";
          canvasTxt.lineHeight = 18;

          canvasTxt.drawText(context, rules, 50, 100, 550, 300);

          //GM text

          canvasTxt.drawText(context, boggleHortsStoryIntro, 50, 490, 550, 300);

          resolve(canvasElement);

        } catch (err) {
            reject(err);
        }
    })
}


export const translationCanvasGenerator = async function translationCanvasGenerator (translationArr) {
    return new Promise((resolve, reject) => {
        try {
            const pagesNodesArray = [];
            const columns = [];
            let tmpArray = [];
            let page = 0;
            let column = 1;

            for (let i = 0; i < translationArr.length; i++) {
                if ((i % 40) === 0 && i !== 0) {
                    columns.push(tmpArray)
                    tmpArray = [];

                }

                tmpArray.push(translationArr[i]);

            }

            for (let j = 0; j < columns.length; j++) {
                //Create Canvas
                var canvasElement    = createCanvas();
                var context          = canvasElement.getContext("2d");
                context.fillStyle    = '#fff';
                context.fillRect(0, 0, 675, 900);


                //Title
                context.font = "Eagle Lake";
                context.fillStyle = "rgba(80, 80, 80, 1)";
                canvasTxt.drawText(context, "Story Teller Translation Sheet:", 50, 40, 300, 50);

                //Translation
                canvasTxt.fontSize = "12";
                canvasTxt.lineHeight = 18;

                var languageColOne = columns[j].join("\n");
                var languageColTwo = columns[j+1] ? columns[j+1].join("\n") : "";

                canvasTxt.drawText(context, languageColOne, 50, 70, 300, 800);
                canvasTxt.drawText(context, languageColTwo, 340, 70, 300, 800);

                pagesNodesArray.push(canvasElement);
                j++;
                if (!columns[j]) {
                    break;
                }

            }

            resolve(pagesNodesArray);

        } catch (err) {
            reject(err);
        }
    })
}

function createCanvas () {
  var canvasElement    = document.createElement("canvas");
  canvasElement.width  = 670;
  canvasElement.height = 867;
  canvasElement.style  = "display: none";
  return canvasElement;
}