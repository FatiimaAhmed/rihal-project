import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentsService } from 'src/app/students.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {
  @Input() type: string = "";
  placeholder: string = "";
  label: string = "";
  name = new FormControl('');

  constructor(private activeModal: NgbActiveModal, private studentsService: StudentsService) { }

  ngOnInit(): void {
    this.placeholder = `please enter ${this.type} name`;
    this.label = `${this.type} Name`;
  }

  onAddClass() {
    this.studentsService.addClass(this.name.value).subscribe(res => this.activeModal.close(res), err => this.activeModal.close(err));
  }

  onAddCountry() {
    this.studentsService.addCountry(this.name.value).subscribe(res => this.activeModal.close(res), err => this.activeModal.close(err));
  }

  onCancel() {
    this.activeModal.dismiss();
  }

}
