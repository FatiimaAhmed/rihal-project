import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent implements OnInit {
  isDarkTheme: boolean = false;
  modeSrc: string = 'assets/icons/moon.svg';
  constructor() { }

  ngOnInit(): void {
    let mode = localStorage.getItem('mode');
    this.isDarkTheme = JSON.parse(mode!);
    this.setTheme();
  }

  onToggle() {
    this.isDarkTheme = !this.isDarkTheme;
    this.setTheme();
  };

  setTheme() {
    if (this.isDarkTheme) {
      this.modeSrc = 'assets/icons/sun.svg';
      document.body.classList.add('dark');
    } else {
      this.modeSrc = 'assets/icons/moon.svg';
      document.body.classList.remove('dark');
    }

    //save user prefrence
    localStorage.setItem('mode', JSON.stringify(this.isDarkTheme));
  }

}
