class parcel {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    
    this.vx = 0;
    this.vy = 0;
    
    this.hist = [];
    
    this.cor = 0.05;
    this.rho = 4;
    this.dt = 0.25;

    this.move = false;
    this.kill = false;
  }
  
  physics(pressureField){
    let posX = round(this.x/fac)+1;
    let posY = round(this.y/fac)+1;
    
    if (posX>0 && posX<(pressureField.length-1) && posY>0 && posY<(pressureField[0].length-1) && this.move){
      let dpdx = pressureField[posX+1][posY].V-pressureField[posX-1][posY].V;
      let dpdy = pressureField[posX][posY+1].V-pressureField[posX][posY-1].V;
      
      let ax = -this.cor*this.vy - (1/this.rho)*dpdx;
      let ay = this.cor*this.vx - (1/this.rho)*dpdy;

      this.x += this.vx*this.dt;
      this.y += this.vy*this.dt;
      
      // Simplified Eq's of Motion
      if (motionType.selected()=='Real Motion'){
        this.x += this.vx*this.dt;
        this.y += this.vy*this.dt;
        this.vx += ax*this.dt;
        this.vy += ay*this.dt;
      }

      // Geostrophic Motion
      if (motionType.selected()=='Geostrophic Motion'){
        this.x += this.vx*this.dt;
        this.y += this.vy*this.dt;
        this.vx = (1/(this.cor*this.rho))*dpdy;
        this.vy = -(1/(this.cor*this.rho))*dpdx;
      }
      
    } else {
      this.kill = true;
    }
  }
  
  initialize(pressureField){
    let posX = round(this.x/fac);
    let posY = round(this.y/fac);
    
    if (posX>0 && posX<(pressureField.length-1) && posY>0 && posY<(pressureField[0].length-1)){
      let dpdx = pressureField[posX+1][posY].V-pressureField[posX-1][posY].V;
      let dpdy = pressureField[posX][posY+1].V-pressureField[posX][posY-1].V;
      
      this.vx = (1/(this.cor*this.rho))*dpdy;
      this.vy = -(1/(this.cor*this.rho))*dpdx;
      
      this.move = true;
      
    } else {
      this.kill = true;
    }
  }
  
  show(){
    push();
    fill(0);
    noStroke(0);
    circle(this.x,this.y,2);
    pop();
  }
  
}
