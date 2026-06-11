// Object Arrays
let pressureField = [];
let isoFields = [];
let parcels = [];
let maxI, maxJ;

let scaling = 0;
let oscaling = 0;
let isolines = [];
let isoscale = 0.1;
let isomax = 0.0;
let isomin = 0.0;
let fac = 2;
let f = 1;

let Nmax = 4000;

let pressureSelect;
let motionType;
let resetButton;
let resetPointsButton;

function setup() {
  createCanvas(900, 800);
  
  translate(0, height);
  fac = round(width/40);
  translate(-2*fac, fac)
  scale(1, -1);
  
  pressureSelect = createSelect();
  pressureSelect.position(0, height);
  pressureSelect.option('H');
  pressureSelect.option('L');
  pressureSelect.style('font-size', '32px');

  motionType = createSelect();
  motionType.position(0, height+75);
  motionType.option('Real Motion');
  motionType.option('Geostrophic Motion');
  motionType.style('font-size', '32px');
  
  resetButton = createButton('Reset Everything');
  resetButton.position(0, height+150);
  resetButton.style('font-size', '32px');
  resetButton.mousePressed(reset);
  
  resetPointsButton = createButton('Reset Tracers');
  resetPointsButton.position(0, height+225);
  resetPointsButton.style('font-size', '32px');
  resetPointsButton.mousePressed(resetPoints);
  
  // Create field
  let I = 0;
  let J = 0;
  for (let i = -fac; i < (width+2*fac); i += fac) {
    pressureField[I] = [];
    J = 0;
    for (let j = -fac; j < (height+2*fac); j += fac) {
      p = new scalarFieldPoint(i, j, 0);
      pressureField[I][J] = p;
      J += 1;
    }
    I += 1;
  }
  maxI = I;
  maxJ = J;
  
  updateIsoFields(pressureField);
  
  for (let i=0; i<Nmax; i+=1){
    p = new parcel(random(0,width),random(0,height));
    parcels[i] = p;
  }
  
}

function draw() {
  background(220);
  
  showIsoFields();
  
  for (let i=0; i<parcels.length; i++){
    if (parcels[i].move){
      parcels[i].physics(pressureField);
    }
    parcels[i].show();
  }
  
  let N = parcels.length;
  for (let i=0; i<parcels.length; i++){
    if (parcels[i].kill){
      parcels.splice(i,1);
      N -=1;
    }
  }
  
  for (let i=N; i<Nmax; i++){
    p = new parcel(random(0,width),random(0,height));
    p.initialize(pressureField);
    parcels[i] = p;
  }
}

function mousePressed() {
  let posX = round(mouseX/(width/4))*(width/4);
  let posY = round(mouseY/(height/4))*(height/4);
  
  if (posY<height && posY>0){
    for (let i = 0; i<maxI; i++) {
      for (let j = 0; j<maxJ; j++) {
        let r = pow(pressureField[i][j].x-posX,2)+pow(pressureField[i][j].y-posY,2);
        if (pressureSelect.selected()=='H'){
            pressureField[i][j].V += exp(-r/20000);
        }
        if (pressureSelect.selected()=='L'){
            pressureField[i][j].V -= exp(-r/20000);
        }
      }
    }
    
    updateIsoFields(pressureField);
    
    for (let i=0; i<parcels.length; i++){
      parcels[i].initialize(pressureField);
    }
  }
}

function touchStarted() {
  let posX = round(touch.x/(width/4))*(width/4);
  let posY = round(touch.y/(height/4))*(height/4);
  
  if (posY<height && posY>0){
    for (let i = 0; i<maxI; i++) {
      for (let j = 0; j<maxJ; j++) {
        let r = pow(pressureField[i][j].x-posX,2)+pow(pressureField[i][j].y-posY,2);
        if (pressureSelect.selected()=='H'){
            pressureField[i][j].V += exp(-r/20000);
        }
        if (pressureSelect.selected()=='L'){
            pressureField[i][j].V -= exp(-r/20000);
        }
      }
    }
    
    updateIsoFields(pressureField);
    
    for (let i=0; i<parcels.length; i++){
      parcels[i].initialize(pressureField);
    }
  }
}

function reset(){
  for (let i =0; i<maxI; i++) {
    for (let j=0; j<maxJ; j++) {
      pressureField[i][j].V = 0;
    }
  }
  
  updateIsoFields(pressureField)
  
  parcels = [];
  for (let i=0; i<Nmax; i+=1){
    p = new parcel(random(0,width),random(0,height));
    parcels[i] = p;
  }
}

function resetPoints(){
  parcels = [];
  for (let i=0; i<Nmax; i+=1){
    p = new parcel(random(0,width),random(0,height));
    p.initialize(pressureField);
    parcels[i] = p;
  }
}

function showIsoFields(){
  for (let k=0; k<isoFields.length; k++) {
    for (let i=0; i<isoFields[0].length; i++){
      for (let j=0; j<isoFields[0][0].length; j++){
        //print(isoFields[k][i][j])
        isoFields[k][i][j].show()
      }
    }
  }
}

function updateIsoFields(scalarField){
  isomin = 1e27
  isomax = -1e27
  for (let i = 0; i < scalarField.length; i++) {
      for (let j = 0; j < scalarField[0].length; j++) {
        if (scalarField[i][j].V>isomax){
          isomax = scalarField[i][j].V
        }
        if (scalarField[i][j].V<isomin){
          isomin = scalarField[i][j].V
        }
      }
    }

  isolines = [];
  isoscale = 0.25;
  
  if (isoscale==0.0){
    isomin = -1;
    isomax = 1;
    isoscale = 0.25;
  }

  for (let i = isomin; i<=isomax; i += isoscale) {
    append(isolines, i);
  }

  isoFields = [];
  for (let k=0; k<isolines.length; k++) {
    //Marching squares
    // Step 1 flip the bits (1: V>=iso[k]; 0: V<iso[k])
    for (let i = 0; i < maxI; i++) {
      for (let j = 0; j < maxJ; j++) {
        scalarField[i][j].flip(isolines[k]);
      }
    }
    
    // Step 2 "March"
    // Each 2x2 cell is assigned ID from 0-15 based on bits
    // Line is drawn based on look-up-table
    
    let cmax;
    let cmin;
    let v, c;
    if (isolines[k] > 0) {
      cmin = color(255,255,255);
      cmax = color(255, 0, 0);
      v = map(isolines[k],0,isomax,0,1);
      c = lerpColor(cmin, cmax, v);
    } else if (isolines[k] < 0) {
      cmin = color("cornflowerblue");
      cmax = color(255, 255, 255);
      v = map(isolines[k],isomin,0,0,1);
      c = lerpColor(cmin, cmax, v);
    } else {
      c = (255,255,255);
    }
    
    
    
    isoFields[k] = [];
    for (let i = 0; i < maxI-1; i++) {
      isoFields[k][i] = [];
      for (let j = 1; j < maxJ; j++) {
        let Pyr = 1 - (isolines[k] - scalarField[i+1][j-1].V)/(scalarField[i+1][j].V-scalarField[i+1][j-1].V);
        let Pxt = (isolines[k] - scalarField[i][j-1].V)/(scalarField[i+1][j-1].V-scalarField[i][j-1].V);
        let Pyl = 1 - (isolines[k] - scalarField[i][j-1].V)/(scalarField[i][j].V-scalarField[i][j-1].V);
        let Pxb = (isolines[k] - scalarField[i][j].V)/(scalarField[i+1][j].V-scalarField[i][j].V);
        let linetype = scalarField[i][j].bit + 2*scalarField[i+1][j].bit + 4*scalarField[i+1][j-1].bit + 8*scalarField[i][j-1].bit;

        iFP = new isoFieldPoint(scalarField[i][j].x, scalarField[i][j].y, Pxb, Pxt, Pyl, Pyr, linetype, c)
        isoFields[k][i][j-1] = iFP;
      }
    }
  }
}
  
