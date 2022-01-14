import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent implements OnInit {
  isDarkTheme: boolean = false;
  modeSrc: string = this.isDarkTheme ? 'assets/icons/sun.svg' : 'assets/icons/sun.svg';

  mode = Boolean(localStorage.getItem('mode'))
  constructor() { }

  ngOnInit(): void {
    this.isDarkTheme = this.mode;
    if (this.isDarkTheme) {
      document.body.classList.toggle('dark');
    }
    console.log(this.isDarkTheme)
  }

  onToggle() {
    this.isDarkTheme = !this.mode;
    console.log(this.isDarkTheme)
    //save last user prefrence to local storage
    localStorage.setItem('mode', String(this.isDarkTheme));

    if (this.isDarkTheme) {
      console.log('night')
      this.modeSrc = 'assets/icons/sun.svg';
    } else {
      console.log('day')
      this.modeSrc = 'assets/icons/moon.svg';
    }

    document.body.classList.toggle('dark');
  }

}
