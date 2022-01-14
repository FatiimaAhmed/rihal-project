import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { StudentModalComponent } from './students/student-modal/student-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddModalComponent } from './students/add-modal/add-modal.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DonutChartComponent } from './dashboard/donut-chart/donut-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';


@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        StudentsComponent,
        StudentModalComponent,
        AddModalComponent,
        DonutChartComponent,
        ThemeSwitchComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FontAwesomeModule,
        [SweetAlert2Module.forRoot()],
        NgApexchartsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }