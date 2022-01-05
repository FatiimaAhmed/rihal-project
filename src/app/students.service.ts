import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class StudentsService {
  uri: string = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  addStudent(student: {}) {
    return this.http.post(this.uri + '/addStudent', student)
  }
}
