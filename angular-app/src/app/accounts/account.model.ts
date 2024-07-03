import {Student} from "../students/student.model";


export class Account {
  id?: number;
  accountName?: string;
  student: Student;

  constructor(id: number, accountName: string, student: Student) {
    this.id = id;
    this.accountName = accountName;
    this.student = student;
  }
}
