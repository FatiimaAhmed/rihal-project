import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class StudentsService {
  uri: string = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  addStudent(student: {}) {
    return this.http.post(this.uri + '/addStudent', student)
  }

  getStudents() {
    return this.http.get(this.uri + '/getStudents').pipe(
      map(res => {
        return res
      })
    )
  };

  deleteStudent(id: number) {
    return this.http.post(`${this.uri}/deleteStudent/${id}`, {});
  }

  getClasses() {
    return this.http.get(this.uri + '/getClasses').pipe(
      map(res => {
        return res
      })
    )
  };

  getCountries() {
    return this.http.get(this.uri + '/getCountries').pipe(
      map(res => {
        return res
      })
    )
  };
}
