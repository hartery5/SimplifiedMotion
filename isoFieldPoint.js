class isoFieldPoint {
  constructor(x, y, Pxb, Pxt, Pyl, Pyr, linetype, fillcolor) {
    this.x = x;
    this.y = y;

    this.Pxb = Pxb;
    this.Pxt = Pxt;
    this.Pyl = Pyl;
    this.Pyr = Pyr;
    
    this.linetype = linetype;
    this.fillcolor = fillcolor;
  }
  
  
  show(){
    push();
    translate(this.x,this.y);

    let spacingx = fac;
    let spacingy = fac;

    let xmb = this.Pxb*spacingx;
    let xmt = this.Pxt*spacingx;
    let yml = -this.Pyl*spacingy;
    let ymr = -this.Pyr*spacingy;

    let left = 0;
    let right = spacingx;
    let bottom = 0;
    let top = -spacingy;

    switch(this.linetype){
      case 1:
        beginShape();
        fill(this.fillcolor);
        noStroke();
        vertex(left,bottom);
        vertex(left,yml);
        vertex(xmb,bottom);
        endShape();
        
        strokeWeight(1);
        stroke(0);
        noFill();
        line(left, yml, xmb, bottom);
        break;
      case 2:
        beginShape();
        fill(this.fillcolor);
        noStroke();
        vertex(xmb,bottom);
        vertex(right,bottom);
        vertex(right,ymr);
        endShape();
        
        strokeWeight(1);
        stroke(0);
        noFill();
        line(xmb, bottom, right, ymr);
        break;
      case 3:
        beginShape();
        fill(this.fillcolor);
        noStroke();
        vertex(0,0);
        vertex(0,yml);
        vertex(right,ymr);
        vertex(right,0);
        endShape();
        
        strokeWeight(1);
        stroke(0);
        noFill();
        line(left, yml, right, ymr);
        break;
      case 4:
        beginShape();
        fill(this.fillcolor);
        noStroke();
        vertex(xmt,-spacingy);
        vertex(spacingx,-spacingy);
        vertex(spacingx,ymr);
        endShape();
        
        strokeWeight(1);
        stroke(0);
        noFill();
        line(xmt, top, right, ymr);
        break;
      case 5:
        beginShape();
        fill(c);
        noStroke();
        vertex(0,0);
        vertex(0,yml);
        vertex(xmt,-spacingy);
        vertex(spacingx,-spacingy);
        vertex(spacingx,ymr);
        vertex(xmb,0);
        endShape();
        
        strokeWeight(1);
        stroke(0);
        noFill();
        line(xmb, bottom, right, ymr);
        line(left, yml, xmt, top);
        break;
      case 6:
        beginShape();
        fill(this.fillcolor);
        noStroke();
        vertex(xmb,0);
        vertex(xmt,-spacingy);
        vertex(spacingx,-spacingy);
        vertex(spacingx,0);
        endShape();
        
        strokeWeight(1);
        stroke(0);
        noFill();
        line(xmb, bottom, xmt, top);
        break;
      case 7:
        beginShape();
        fill(this.fillcolor);
        noStroke();
        vertex(0,0);
        vertex(0,yml);
        vertex(xmt,-spacingy);
        vertex(spacingx,-spacingy);
        vertex(spacingx,0);
        endShape();
        
        strokeWeight(1);
        stroke(0);
        noFill();
        line(left, yml, xmt, top);
        break;
      case 8:
        beginShape();
        fill(this.fillcolor);
        noStroke();
        vertex(0,yml);
        vertex(0,-spacingy);
        vertex(xmt,-spacingy);
        endShape();
        
        strokeWeight(1);
        stroke(0);
        noFill();
        line(left, yml, xmt, top);
        break;
      case 9:
        beginShape();
        fill(this.fillcolor);
        noStroke();
        vertex(0,0);
        vertex(0,-spacingy);
        vertex(xmt,-spacingy);
        vertex(xmb,0);
        endShape();
        
        strokeWeight(1);
        stroke(0);
        noFill();
        line(xmb, bottom, xmt, top);
        break;
      case 10:
        beginShape();
        fill(this.fillcolor);
        noStroke();
        vertex(0,yml);
        vertex(0,-spacingy);
        vertex(xmt,-spacingy);
        vertex(spacingx,ymr);
        vertex(spacingx,0);
        vertex(xmb,0);
        
        strokeWeight(1);
        stroke(0);
        noFill();
        line(left, yml, xmb, bottom);
        line(xmt, top, right, ymr);
        break;
      case 11:
        beginShape();
        fill(this.fillcolor);
        noStroke();
        vertex(0,0);
        vertex(0,-spacingy);
        vertex(xmt,-spacingy);
        vertex(spacingx,ymr);
        vertex(spacingx,0);
        endShape();
        
        strokeWeight(1);
        stroke(0);
        noFill();
        line(xmt, top, right, ymr);
        break;
      case 12:
        beginShape();
        fill(this.fillcolor);
        noStroke();
        vertex(0,yml);
        vertex(0,-spacingy);
        vertex(spacingx,-spacingy);
        vertex(spacingx,ymr);
        endShape();
        
        strokeWeight(1);
        stroke(0);
        noFill();
        line(left, yml, right, ymr);
        break;
      case 13:
        beginShape();
        fill(this.fillcolor);
        noStroke();
        vertex(0,0);
        vertex(0,-spacingy);
        vertex(spacingx,-spacingy);
        vertex(spacingx,ymr);
        vertex(xmb,0);
        endShape();
        
        strokeWeight(1);
        stroke(0);
        noFill();
        line(xmb, bottom, right, ymr);
        break;
      case 14:
        beginShape();
        fill(this.fillcolor);
        noStroke();
        vertex(0,yml);
        vertex(0,-spacingy);
        vertex(spacingx,-spacingy);
        vertex(spacingx,0);
        vertex(xmb,0);
        endShape();
        
        strokeWeight(1);
        stroke(0);
        noFill();
        line(left, yml, xmb, bottom);
        break;
      case 15:
        beginShape();
        fill(this.fillcolor);
        noStroke();
        vertex(0,0);
        vertex(0,-spacingy);
        vertex(spacingx,-spacingy);
        vertex(spacingx,0);
        endShape();
    }

    pop();
  }
}