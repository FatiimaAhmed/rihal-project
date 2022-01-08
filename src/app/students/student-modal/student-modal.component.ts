import { Component, OnInit, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { classData, country } from 'src/app/models.model';
import { StudentsService } from 'src/app/students.service';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
  styleUrls: ['./student-modal.component.scss']
})
export class StudentModalComponent implements OnInit {
  @Input() student: any;
  @Input() classes: classData[] = [];
  @Input() countries: country[] = [];
  
  studentForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    birthday: new FormControl(''),
    class: new FormControl(0),
    country: new FormControl(0),
  });

  isEdit: boolean = false;

  get name() { return this.studentForm.get('name'); }

  constructor(private activeModal: NgbActiveModal, private studentService: StudentsService) { }

  ngOnInit(): void {
    if (this.student) {
      this.isEdit = true;
      this.studentForm.patchValue({
        name: this.student.name,
        birthday: this.student.date_of_birth,
        class: this.student.class_id,
        country: this.student.country_id,
      })
    } else {
      console.log('new student')
    }
  }

  onSubmit() {
    // console.log(this.studentForm.value);
    if (this.studentForm.valid) {
      this.studentService.addStudent(this.studentForm.value).subscribe(res => {
        this.activeModal.close(res);
      })
    }
  };

  onEdit() {
    console.log(this.studentForm.value)
    this.studentService.editStudent(this.student.student_id, this.studentForm.value).subscribe(res => {
      this.activeModal.close(res);
    })
  }

  onCancel() {
    this.activeModal.dismiss();
  }

}
