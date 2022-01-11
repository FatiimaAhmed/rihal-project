import { Component, OnInit } from '@angular/core';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user = faUserAlt;
  totalOfStudents: number = 0;
  classes: any[] = [];
  constructor(private studentsService: StudentsService) { }

  ngOnInit(): void {
    this.getClasses();
  }

  getClasses() {
    this.studentsService.getClasses().subscribe((res: any) => this.classes = res);
  }

}
