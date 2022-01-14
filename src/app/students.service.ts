import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class StudentsService {
  uri: string = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  //students
  getStudents() {
    return this.http.get(this.uri + '/getStudents').pipe(
      map(res => {
        return res
      })
    )
  };

  getTotalstudents() {
    return this.http.get(this.uri + '/totalStudents').pipe(
      map(res => {
        return res
      })
    )
  };

  getStudentsByClass(id: number) {
    return this.http.get(this.uri + '/getStudentsByClass/' + id).pipe(
      map(res => {
        return res
      })
    )
  };

  getStudentsByCountry(id: number) {
    return this.http.get(this.uri + '/getStudentsByCountry/' + id).pipe(
      map(res => {
        return res
      })
    )
  };

  addStudent(student: {}) {
    return this.http.post(this.uri + '/addStudent', student);
  };

  editStudent(id: number, student: any) {
    return this.http.post(`${this.uri}/editStudent/${id}`, student);
  };

  deleteStudent(id: number) {
    return this.http.post(`${this.uri}/deleteStudent/${id}`, {});
  };

  //classes
  getClasses() {
    return this.http.get(this.uri + '/getClasses').pipe(
      map(res => {
        return res
      })
    )
  };

  addClass(name: any) {
    return this.http.post(this.uri + '/addClass', { name: name });
  };

  //countries
  getCountries() {
    return this.http.get(this.uri + '/getCountries').pipe(
      map(res => {
        return res
      })
    )
  };

  addCountry(name: any) {
    return this.http.post(this.uri + '/addCountry', { name: name });
  };
}
