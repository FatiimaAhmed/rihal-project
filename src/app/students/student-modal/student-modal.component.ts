import { Component, OnInit, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { StudentsService } from 'src/app/students.service';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
  styleUrls: ['./student-modal.component.scss']
})
export class StudentModalComponent implements OnInit {
  @Input() student: any;

  studentForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    birthday: new FormControl(''),
    class: new FormControl(0),
    country: new FormControl(0),
  });

  classes: any[] = [];
  countries: any[] = [];
  date!: NgbDateStruct;
  isDisabled: boolean = true;

  get name() { return this.studentForm.get('name'); }

  constructor(private activeModal: NgbActiveModal, private studentService: StudentsService) { }

  ngOnInit(): void {
    this.onGetClasses();
    this.onGetCountries();
    if (this.student) {
      console.log(this.student)
      this.studentForm.patchValue({
        name: this.student.name,
        birthday: this.student.date_of_birth,
        class: this.student.class_name,
        country: this.student.country_name,
      })
    } else {
      console.log('new student')
    }
  }

  onSubmit() {
    let birthday = `${this.date.year}-${this.date.month}-${this.date.day}`;
    this.studentForm.patchValue({
      birthday: birthday
    });
    //console.log(this.studentForm.value);
    if (this.studentForm.valid) {
      this.isDisabled = false;
      this.studentService.addStudent(this.studentForm.value).subscribe(res => {
        this.activeModal.close(res);
      })
    }
  };

  onCancel() {
    this.activeModal.dismiss();
  }

  onGetClasses() {
    this.studentService.getClasses().subscribe((res: any) => this.classes = res)
  }

  onGetCountries() {
    this.studentService.getCountries().subscribe((res: any) => this.countries = res)
  }

}
