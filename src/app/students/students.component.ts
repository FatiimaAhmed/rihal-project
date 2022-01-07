import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentsService } from '../students.service';
import { StudentModalComponent } from './student-modal/student-modal.component';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  show: boolean = false;
  message: string = "";
  students: any[] = [];
  edit = faEdit;
  delete = faTrashAlt;
  add = faPlus;

  constructor(private modalService: NgbModal, private studentsService: StudentsService) { }

  ngOnInit(): void {
    this.onGetStudents();
  }

  onAddStudent() {
    const modalRef = this.modalService.open(StudentModalComponent, { size: 'sm', centered: true });
    modalRef.closed.subscribe(res => {
      this.show = true;
      this.message = res;
      this.onGetStudents();
    })
  }

  onEditStudent(student: {}) {
    const modalRef = this.modalService.open(StudentModalComponent, { size: 'sm', centered: true });
    modalRef.componentInstance.student = student;
  }

  onDeleteStudent(id: number) {
    //add confirmation alert
    this.studentsService.deleteStudent(id).subscribe(res => this.onGetStudents());
  }

  onGetStudents() {
    this.studentsService.getStudents().subscribe((res: any) => this.students = res)
  }

}
