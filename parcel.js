class parcel {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    
    this.vx = 0.0;
    this.vy = 0.0;
    
    this.hist = [];
    
    this.cor = 0.1;
    this.rho = 2.0;
    this.mu = 0.01;
    this.dt = 0.25;

    this.move = false;
    this.kill = false;
    this.age = 0;
  }
  
  physics(pressureField,speedField){
    let posX = round(this.x/fac)+1;
    let posY = round(this.y/fac)+1;
    
    if (posX>0 && posX<(pressureField.length-1) && posY>0 && posY<(pressureField[0].length-1) && this.move){
      let dpdx = pressureField[posX+1][posY].V-pressureField[posX-1][posY].V;
      let dpdy = pressureField[posX][posY+1].V-pressureField[posX][posY-1].V;
      
      let ax = -(1/this.rho)*dpdx;
      let ay = -(1/this.rho)*dpdy;

      if (frictionBox.checked()==true){
        ax -= this.mu*this.vx;
        ay -= this.mu*this.vy;
      }

      if (coriolisBox.checked()==true){
        ax -= this.cor*this.vy;
        ay += this.cor*this.vx;
      }

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

      let s = sqrt(pow(this.vx,2)+pow(this.vy,2));
      speedField[posX][posY].V = speedField[posX][posY].V*(this.age-1)/this.age + s/this.age;

      this.age+=1
    } else {
      this.kill = true;
    }
  }
  
  initialize(pressureField,speedField){
    let posX = round(this.x/fac);
    let posY = round(this.y/fac);
    
    if (posX>0 && posX<(pressureField.length-1) && posY>0 && posY<(pressureField[0].length-1)){
      let dpdx = pressureField[posX+1][posY].V-pressureField[posX-1][posY].V;
      let dpdy = pressureField[posX][posY+1].V-pressureField[posX][posY-1].V;
      
      this.vx = (1/(this.cor*this.rho))*dpdy;
      this.vy = -(1/(this.cor*this.rho))*dpdx;

      let s = sqrt(pow(this.vx,2)+pow(this.vy,2));
      speedField[posX][posY].V = s;
      
      this.move = true;
      this.age +=1;
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
