import { Component, Input, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/students.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  age: number[] = [];
  data!: { max: number, average: number, min: number };

  constructor(private studentsService: StudentsService) { }

  ngOnInit(): void {
    this.onGetStudentsAge();
  }

  onGetStudentsAge() {
    this.studentsService.getStudentsAge().subscribe((res: any) => {
      res.forEach((element: any) => {
        this.age.push(this.getAge(element.date_of_birth));
      });

      this.getAverageAge(this.age)
    })
  }

  getAge(dateString: string) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = (today.getMonth() + 1) - (birthDate.getMonth() + 1);
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  getAverageAge(age: number[]) {
    let sumOfAge = 0;
    age.forEach(age => {
      sumOfAge = sumOfAge + age;
    });

    let averageAge = sumOfAge / age.length;
    this.data = {
      max: Math.max(...age),
      average: averageAge,
      min: Math.min(...age)
    };
  }

}
