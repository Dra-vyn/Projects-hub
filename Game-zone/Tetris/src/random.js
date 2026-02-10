class Something {
  constructor() {
  }

  addValue() {
    this.x = 10;
  }
}

const s = new Something();
console.log(s);
s.addValue();
console.log(s);
