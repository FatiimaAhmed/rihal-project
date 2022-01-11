import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentsService } from '../students.service';
import { StudentModalComponent } from './student-modal/student-modal.component';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { classData, country } from '../models.model';
import { AddModalComponent } from './add-modal/add-modal.component';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertIcon } from 'sweetalert2';

interface message {
  text: string, title: string, icon: SweetAlertIcon
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  @ViewChild('Swal')
  public readonly Swal!: SwalComponent;
  message: message = { text: '', title: '', icon: 'success' };
  students: any[] = [];
  filterdStudents: any[] = [];
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
      if (res.error) {
        this.message = {
          text: res.error,
          title: 'error',
          icon: 'error'
        };
      } else {
        this.message = {
          text: res,
          title: 'success',
          icon: 'success'
        };
      }

      this.showToast(this.message);
      this.onGetStudents();
    })
  }

  onEditStudent(student: any) {
    const modalRef = this.modalService.open(StudentModalComponent, { size: 'md', centered: true });
    this.classes.forEach(classIns => {
      if (classIns.class_name == student.class_name) {
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
      if (res.error) {
        this.message = {
          text: res.error,
          title: 'error',
          icon: 'error'
        };
      } else {
        this.message = {
          text: res,
          title: 'success',
          icon: 'success'
        };
      }
      this.showToast(this.message);
      this.onGetStudents();
    })
  }

  onDeleteStudent(id: number) {
    this.studentsService.deleteStudent(id).subscribe((res: any) => {
      this.message = {
        text: res,
        title: 'success',
        icon: 'success'
      };

      this.onGetStudents()
    },err => {
      this.message = {
        text: err.error,
        title: 'success',
        icon: 'error'
      };
    });

    this.showToast(this.message);
  }

  onAdd(type: string) {
    const modalRef = this.modalService.open(AddModalComponent, { size: 'md', centered: true });
    modalRef.componentInstance.type = type;
    modalRef.closed.subscribe(res => {
      if(res.error) {
        this.message = {
          text: res.error,
          title: 'error',
          icon: 'error'
        };
      } else {
        this.message = {
          text: res,
          title: 'success',
          icon: 'success'
        };
      }

      this.showToast(this.message);

      this.onGetClasses();
      this.onGetCountries();
    })
  }

  onGetStudents() {
    this.studentsService.getStudents().subscribe((res: any) => {this.students = res; this.filterdStudents = res;})
  }

  onGetClasses() {
    this.studentsService.getClasses().subscribe((res: any) => this.classes = res)
  }

  onGetCountries() {
    this.studentsService.getCountries().subscribe((res: any) => this.countries = res)
  };

  showToast(msg: message) {
    this.Swal.title = msg.title;
    this.Swal.text = msg.text;
    this.Swal.icon = msg.icon;
    this.Swal.fire();
  };

  onFilter(event: any) {
    this.filterdStudents = this.students;
    let searchTerm = event.target.value.toLowerCase();
    if (searchTerm == "") {
      this.filterdStudents = this.students;
    } else {
      this.filterdStudents = this.students.filter(student => {
        return student.name.toLowerCase().includes(searchTerm) || student.class_name.toLowerCase().includes(searchTerm) || student.country_name.toLowerCase().includes(searchTerm);
      });
    };
  }
}
