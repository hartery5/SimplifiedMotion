class scalarFieldPoint {
  constructor(x, y, V) {
    this.x = x;
    this.y = y;

    this.V = V;

    this.bit = 0;
    this.linetype=0;
  }
  
  flip(c) {
    if (this.V>=c) {
      this.bit = 1;
    } else {
      this.bit = 0;
    }
  }
  
}