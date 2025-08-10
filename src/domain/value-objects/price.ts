export class Price {
  private value: number;

  constructor(price: number) {
    if (price < 0 || isNaN(price)) {
      throw new Error('Invalid price');
    }
    this.value = price;
  }

  public getValue(): number {
    return this.value;
  }
}
