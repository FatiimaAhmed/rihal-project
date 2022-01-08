import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentsService } from '../students.service';
import { StudentModalComponent } from './student-modal/student-modal.component';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { classData, country } from '../models.model';
import { AddModalComponent } from './add-modal/add-modal.component';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  show: boolean = false;
  message: string = "";
  students: any[] = [];
  classes: classData[] = [];
  countries: country[] = [];
  edit = faEdit;
  delete = faTrashAlt;
  add = faPlus;

  constructor(private modalService: NgbModal, private studentsService: StudentsService) { }

  ngOnInit(): void {
    this.onGetStudents();
    this.onGetCountries();
    this.onGetClasses();
  }

  onAddStudent() {
    const modalRef = this.modalService.open(StudentModalComponent, { size: 'md', centered: true });
    modalRef.componentInstance.classes = this.classes;
    modalRef.componentInstance.countries = this.countries;
    modalRef.closed.subscribe(res => {
      this.show = true;
      this.message = res;
      this.onGetStudents();
    })
  }

  onEditStudent(student: any) {
    const modalRef = this.modalService.open(StudentModalComponent, { size: 'md', centered: true });
    this.classes.forEach(classIns => {
      if(classIns.class_name == student.class_name) {
        student.class_id = classIns.id;
      }
    });

    this.countries.forEach(country => {
      if (country.country_name == student.country_name) {
        student.country_id = country.id;
      }
    });

    modalRef.componentInstance.classes = this.classes;
    modalRef.componentInstance.countries = this.countries;
    modalRef.componentInstance.student = student;
   
    modalRef.closed.subscribe(res => {
      console.log(res)
      this.message = res;
      this.onGetStudents();
    })
  }

  onDeleteStudent(id: number) {
    //add confirmation alert
    this.studentsService.deleteStudent(id).subscribe(res => this.onGetStudents());
  }

  onAdd(type: string) {
    const modalRef = this.modalService.open(AddModalComponent, { size: 'md', centered: true });
    modalRef.componentInstance.type = type;
    modalRef.closed.subscribe(res => {
      console.log(res);
      this.onGetClasses();
      this.onGetCountries();
    })
  }

  onGetStudents() {
    this.studentsService.getStudents().subscribe((res: any) => this.students = res)
  }

  onGetClasses() {
    this.studentsService.getClasses().subscribe((res: any) => this.classes = res)
  }

  onGetCountries() {
    this.studentsService.getCountries().subscribe((res: any) => this.countries = res)
  }

}
