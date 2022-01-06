import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentsService } from '../students.service';
import { StudentModalComponent } from './student-modal/student-modal.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  show: boolean = false;
  message: string = "";
  students: any[] = [];
  constructor(private modalService: NgbModal, private studentsService: StudentsService) { }

  ngOnInit(): void {
    this.onGetStudents();
  }

  onAddStudent() {
    const modalRef = this.modalService.open(StudentModalComponent, { size: 'sm', centered: true });
    modalRef.closed.subscribe(res => {
      this.show = true;
      this.message = res;
    })
  }

  onGetStudents() {
    this.studentsService.getStudents().subscribe(res => console.log(res))
  }

}
