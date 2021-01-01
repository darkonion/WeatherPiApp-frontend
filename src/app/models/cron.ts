
export class Cron {
  id: number = 1;
  airCron: string;
  basicCron: string;

  set(basic: string, air: string): void {
    this.airCron = air;
    this.basicCron = basic;
  }

  toString(): string {
    return "Basic cron: " + this.basicCron + " | Air cron: " + this.airCron;
  }

}
