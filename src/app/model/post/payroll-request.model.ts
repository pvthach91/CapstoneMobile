export class PayrollRequest {
  employeeId: string;
  forYear: number;
  forMonth: number;


  constructor(employeeId: string, forYear: number, forMonth: number) {
    this.employeeId = employeeId;
    this.forYear = forYear;
    this.forMonth = forMonth;
  }
}

