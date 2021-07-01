/**
 * @description Student类
 */

class Student {
  private name: string;
  private score: number;
  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;
  }
  public getName(): string {
    return this.name;
  }
  public getScore(): number {
    return this.score;
  }
  public toString(): void {
    console.log(`Student(${this.name}: ${this.score})`);
  }
}
export { Student };
