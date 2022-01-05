import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rihal-project';
  currentUrl: string = '';
  label: string = '';
  constructor(private location: Location) {
    location.onUrlChange(val =>  this.currentUrl = val
      // val == "/dashboard" ? this.currentUrl = "students" : this.currentUrl = "dashboard"
      );
  }
}
