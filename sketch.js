// Better COVID visualization

let emptyPieChart;
let dataFile;

let newCases, notVaccinated, partiallyVaccinated, fullyVaccinated, date;
let NVpopulation, PVpopulation, FVpopulation;
let NVcaseRate, PVcaseRate, FVcaseRate;
let maxCaseRate;

let state = "start";

let theInputs = [];

function preload() {
  emptyPieChart = loadImage("assets/better-visualization-empty.png");
  // dataFile = loadTable("COVID-case-rates-per-100k.csv", "csv", "header");
}

function setup() {
  createCanvas(emptyPieChart.width, emptyPieChart.height);
  // newCases = int(dataFile.getColumn("New Cases")[0]);
  // notVaccinated = int(dataFile.getColumn("Not Vaccinated (NV)")[0]);
  // partiallyVaccinated = int(dataFile.getColumn("Partially Vaccinated (PV)")[0]);
  // fullyVaccinated = int(dataFile.getColumn("Fully Vaccinated (FV)")[0]);
  // date = dataFile.getColumn("Date")[0];
  // NVpopulation = int(dataFile.getColumn("Not Vaccinated Population")[0]);
  // PVpopulation = int(dataFile.getColumn("Partially Vaccinated Population")[0]);
  // FVpopulation = int(dataFile.getColumn("Fully Vaccinated Population")[0]);


  let thingsToKnow = ["Date", "Total New Cases", "Not Vaccinated Cases", "Partially Vaccinated Cases", "Fully Vaccinated Cases", "Not Vaccinated Population", "Partially Vaccinated Population", "Fully Vaccinated Population"];

  let defaultValues = ["September 24, 2021",528,426,27,75,366648,86796,725237];

  // add label and question to the html form
  for (let i=0; i<thingsToKnow.length; i++) {
    let message = thingsToKnow[i];
    let startingInput = defaultValues[i];

    let label = createElement("label", message);
    label.parent("visualizer");
  
    let question;
    question = createInput("");
    question.class("form-control mb-3 question");
    question.value(startingInput);
    question.parent("visualizer");
    theInputs.push(question);
  }

  // generate visual button
  let generateVisualButton = createButton("Make Bar Graph");
  generateVisualButton.attribute("type", "button");
  generateVisualButton.parent("visualizer");
  generateVisualButton.class("btn btn-success mb-4 d-block");
  generateVisualButton.mousePressed(makeVisual);

  // save visual button
  let saveVisual = createButton("Save Image");
  saveVisual.attribute("type", "button");
  saveVisual.parent("visualizer");
  saveVisual.class("btn btn-primary d-block");
  saveVisual.mousePressed(saveImage);

}

function draw() {
  if (state === "visualized") {
    //show bar graph visual
    background(220);
    image(emptyPieChart, 0, 0);
    showCaseNumbers();
    barGraph();
  }
}

function makeVisual() {
  date = theInputs[0].value();
  newCases = int(theInputs[1].value());
  notVaccinated = int(theInputs[2].value());
  partiallyVaccinated = int(theInputs[3].value());
  fullyVaccinated = int(theInputs[4].value());
  NVpopulation = int(theInputs[5].value());
  PVpopulation = int(theInputs[6].value());
  FVpopulation = int(theInputs[7].value());

  calculateValues();
  state = "visualized";
}

function saveImage() {
  saveCanvas(date);
}

function calculateValues() {
  NVcaseRate = round(notVaccinated / NVpopulation * 100000, 1);
  PVcaseRate = round(partiallyVaccinated / PVpopulation * 100000, 1);
  FVcaseRate = round(fullyVaccinated / FVpopulation * 100000, 1);
  
  maxCaseRate = max(NVcaseRate, PVcaseRate, FVcaseRate);
}

// function mousePressed() {
//   if (state === "visualized") {
//     saveCanvas(date);
//   }
// }

function showCaseNumbers() {
  // textFont("Verdana");

  //date
  textSize(42);
  textStyle(ITALIC);
  fill("black");
  textAlign(LEFT);
  text(date, 36, 325);

  //cases
  textSize(70);
  textStyle(BOLD);
  fill("white");
  textAlign(CENTER);
  text(newCases, 115, 170);
  text(notVaccinated, 400, 170);
  text(fullyVaccinated, 955, 170);
  fill("black");
  text(partiallyVaccinated, 675, 170);

  //case rates
  textStyle(NORMAL);
  textSize(40);
  fill("white");
  text(NVcaseRate, 133, 870);
  fill("black");
  text(PVcaseRate, 526, 870);
  fill("white");
  text(FVcaseRate, 895, 870);
}


function barGraph() {
  noStroke();
  
  fill("#CD0132");
  let redCaseRectHeight = map(NVcaseRate, 0, maxCaseRate, 0, 400);
  rect(75, 760, 120, -redCaseRectHeight);

  fill("#FEE938");
  let yellowCaseRectHeight = map(PVcaseRate, 0, maxCaseRate, 0, 400);
  rect(465, 760, 120, -yellowCaseRectHeight);  
  
  fill("#006B33");
  let greenCaseRectHeight = map(FVcaseRate, 0, maxCaseRate, 0, 400);
  rect(837, 760, 120, -greenCaseRectHeight);
}