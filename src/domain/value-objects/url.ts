export class Url {
  private value: string;

  constructor(url: string) {
    if (!Url.isValid(url.trim())) {
      throw new Error('Invalid URL');
    }
    this.value = url.trim();
  }

  public getValue(): string {
    return this.value;
  }

  private static isValid(url: string): boolean {
    try {
      const { protocol, hostname } = new URL(url);
      return Boolean(protocol && hostname);
    } catch {
      return false;
    }
  }
}
