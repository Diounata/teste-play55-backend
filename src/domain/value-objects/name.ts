export class Name {
  private value: string;

  constructor(name: string) {
    if (name.trim().length < 2 || name.trim().length > 50) {
      throw new Error('Invalid name');
    }
    this.value = name.trim();
  }

  public getValue() {
    return this.value;
  }
}
