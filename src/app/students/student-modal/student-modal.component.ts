import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentsService } from 'src/app/students.service';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
  styleUrls: ['./student-modal.component.scss']
})
export class StudentModalComponent implements OnInit {
  addStudentForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    birthday: new FormControl(''),
    class: new FormControl(''),
    country: new FormControl(''),
  })
  constructor(private activeModal: NgbActiveModal, private studentService: StudentsService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.addStudentForm.value);
    this.studentService.addStudent(this.addStudentForm.value).subscribe(res => {
      console.log(res)
    })
  }

  onCancel() {
    this.activeModal.dismiss();
  }

}
