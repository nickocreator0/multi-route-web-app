import { Component, OnInit } from '@angular/core';
import {Student} from "./student.model";
import {StudentService} from "./student.service";
import {Address} from "../addresses/address.model";
import {Team} from "../teams/team.model";
import {Account} from "../accounts/account.model";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  studentList?: Student[];
  student?: Student;

  constructor(private studentService: StudentService) { }

  ngOnInit() { this.getStudents();   }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(studentList => this.studentList = studentList);
  }

  add(firstname: string, lastname: string, email: string, telephone: string, /*address: Address*/ addressCity: string, addressStreet: string, addressNumber: string, addressPostalCode: string, accountName: string, studentTeams: string): void {
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();
    telephone = telephone.trim();
    addressCity = addressCity.trim();
    addressStreet = addressStreet.trim();
    addressNumber = addressNumber.trim();
    addressPostalCode = addressPostalCode.trim();
    accountName = accountName.trim();

    // Parse team names into an array
    const teamList = this.parseTeamList(studentTeams);

    // Create the address object
    const address = { city: addressCity, number: addressNumber, postal_code: addressPostalCode, street: addressStreet, id: 0 } as Address;

    // Create the student object
    const newStudent: Student = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      telephone: telephone,
      address: address,
      account: { accountName } as Account,
      teamList: teamList
    };

    this.studentService.addStudent(newStudent)
      .subscribe({
        next: (student: Student) => {
          if (this.studentList) {
            this.studentList.push(student);
          }
        },
        error: (error) => {
          console.error('Error adding student:', error);
        },
        complete: () => {
          if (this.studentList) {
            this.studentService.totalItems.next(this.studentList.length);
            console.log(this.studentList.length);
          }
        }
      });
  }

  // Function to parse the names of teams the student is a member of (taken from input)
  parseTeamList(teamNames: string): Team[] {
    const teamNamesArray = teamNames.split(',').map(teamName => teamName.trim());
    return teamNamesArray.map(teamName => ({ teamName } as Team));
  }


  delete(student: Student): void {
    this.studentList = this.studentList?.filter(c => c !== student);
    this.studentService.deleteStudent(student).subscribe(() => {
        // for automatic update of number of students in parent component
        if(this.studentList != undefined) {
          this.studentService.totalItems.next(this.studentList.length);
          console.log(this.studentList.length);
        }
      }
    );
  }

  deleteAll(): void {
    this.studentService.deleteStudents().subscribe(() => {
        if(this.studentList != undefined) {
          this.studentList.length = 0;
        }
      }
    );
  }

  update(firstname: string, lastname: string, email: string, telephone: string, chosenToUpdateStudent:Student):void {
    let id = chosenToUpdateStudent.id;
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();
    telephone = telephone.trim();
    console.log(id);
    if (id != undefined) {
      this.studentService.updateStudent({firstname, lastname, email, telephone} as Student, id)
        .subscribe({
          next: (student: Student) => {
            if (this.studentList != undefined) {
              let index = this.studentList?.indexOf(chosenToUpdateStudent);
              this.studentList[index] = student;
            }
          },
          error: () => {
          },
          complete: () => {
            if (this.studentList != undefined) {
              this.studentService.totalItems.next(this.studentList.length);
              console.log(this.studentList.length);
            }
          }
        })
    }
  }


  /*************** Added HTTP Methods ***************/
  /** Update part of the student on the server (PATCH) */
  updateStudentDetailsPartially(id: number, newDetails: any): void {
    this.studentService.partialUpdateStudent(newDetails, id)
      .subscribe((student) => {
        console.log(`Updated student details:`, student);
      });
  }
  /** ************************************************* */
  //protected readonly Account = Account;
}

