import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, switchMap, tap, throwError} from "rxjs";
import {Student} from "./student.model";
import {Address} from "../addresses/address.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentsUrl = 'http://localhost:8080/students';
  // Removed /add-address-collection'; from the following line
  private addressesUrl = 'http://localhost:8080/addresses';
  private studentError='';

  constructor(private http: HttpClient) { }

  /** GET students from the server */
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl);
  }

  /** GET student by id. Will 404 if id not found */
  getStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<Student>(url).pipe(
      tap(_ => this.log(`fetched student id=${id}`)),
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );
  }

  /** POST: add a new student to the server */
  addStudent(student: Student): Observable<Student> {
    // Save address if it's new
    if(student.address){
      return this.http.post<Address>(this.addressesUrl, student.address, httpOptions).pipe(
        // one of the options is to cascade address in student as MERGE, then here you require only one request with student instead of two cascading request with address and then student

        // Transform the emitted address into another observable (switchMAp)
        switchMap((addedAddress: Address) => {

          // Update the student object with the new address
          student.address = addedAddress;

          // Save the student with the updated address
          return this.http.post<Student>(this.studentsUrl, student, httpOptions);
        }),
        tap((studentAdded: Student) => this.log(`added student id=${studentAdded.id}`)),
        catchError(this.handleError<Student>('addStudent'))
       );
    }
    // If address already has ID, simply save the student
    else{
      //console.log('Student added', student);
      console.warn('Student does not have an address');
      return this.http.post<Student>(this.studentsUrl, student, httpOptions).pipe(
        tap((studentAdded: Student) => this.log(`added student id=${studentAdded.id}`)),
        catchError(this.handleError<Student>('addStudent'))
      );
    }
  }

  /** DELETE: delete the student from the server */
  deleteStudent(student: Student | number): Observable<Student> {
    const id = typeof student === 'number' ? student : student.id;
    const url = `${this.studentsUrl}/${id}`;
    return this.http.delete<Student>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted student id=${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }

  /** DELETE: delete all the students from the server */
  deleteStudents(): Observable<Student> {
    return this.http.delete<Student>(this.studentsUrl, httpOptions).pipe(
      tap(_ => this.log(`deleted students`)),
      catchError(this.handleError<Student>('deleteStudents'))
    );
  }

  /** PUT: update the student on the server */
  updateStudent(student: Student, id:number): Observable<Student> {
    return this.http.put<Student>(`${this.studentsUrl}/${id}`, student, httpOptions).pipe(
      // tap(_ => this.log(`updated student id=${student.id}`)), // same as the line below
      tap((studentUpdated: Student) => this.log(`updated student id=${studentUpdated.id}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }

  /** PUT: update all the students on the server */
  updateStudents(students: Student[]): Observable<Student[]> {
    return this.http.put<Student[]>(this.studentsUrl, students, httpOptions).pipe(
      tap(_ => this.log(`updated student id=${students}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }


  /*************** Added HTTP Methods ***************/
  /** Update part of the student on the server (PATCH) */
  partialUpdateStudent(updates: any, id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.patch<Student>(url, updates, httpOptions).pipe(
      tap((_) => this.log(`partially updated student id=${id}`)),
      catchError(this.handleError<any>('partialUpdateStudent'))
    );
  }

  /** ************************************************* */

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Check for a specific error status code
      // TODO: better job of transforming error for user consumption
      if (error.status === 403) {
        console.error('Error adding student: Access Denied (CORS)');
        // Handle the CORS error
        return throwError(() =>'Access Denied (CORS)');
      } else {
        // TODO: send the error to remote logging infrastructure
        // Log the error to the console in any case
        console.error(error);
        return of(result as T);
      }
    };
  }

  /** Log a StudentService message with the MessageService */
  private log(message: string) {
    console.log('StudentService: ' + message);
  }

  /** GET number of students from the server */
  getStudentsCounter(): Observable<number> {
    const url = `${this.studentsUrl}/counter`;
    return this.http.get<number>(url);
  }

  // for automatic update of number of students in parent component
  public totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  getCartItems() {
    return this.totalItems.asObservable();
  }


}
