import { Component, OnInit } from '@angular/core';
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
  addStudentForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    birthday: new FormControl(''),
    class: new FormControl(0),
    country: new FormControl(0),
  });

  classes: any[] = [];
  countries: any[] = [];
  date!: NgbDateStruct;
  isDisabled: boolean = true;

  get name() { return this.addStudentForm.get('name'); }

  constructor(private activeModal: NgbActiveModal, private studentService: StudentsService) { }

  ngOnInit(): void {
    this.onGetClasses();
    this.onGetCountries();
  }

  onSubmit() {
    let birthday = `${this.date.day}-${this.date.month}-${this.date.year}`;
    this.addStudentForm.patchValue({
      birthday: birthday
    });
    //console.log(this.addStudentForm.value);
    if (this.addStudentForm.valid) {
      this.isDisabled = false;
      this.studentService.addStudent(this.addStudentForm.value).subscribe(res => {
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
