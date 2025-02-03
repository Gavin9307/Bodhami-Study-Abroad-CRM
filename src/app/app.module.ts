import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { MatExpansionModule, MatTableModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProfileUpdateComponent } from './account/profile-update/profile-update.component';
import { CountrySetupComponent } from './study-abroad-setup/country-setup/country-setup.component';
import { UniversitySetupComponent } from './study-abroad-setup/university-setup/university-setup.component';
import { CourseSetupComponent } from './study-abroad-setup/course-setup/course-setup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { AddCountryComponent } from './study-abroad-setup/add-country/add-country.component';
import { AddUniversityComponent } from './study-abroad-setup/add-university/add-university.component';
import { AddCourseComponent } from './study-abroad-setup/add-course/add-course.component';
import { ManageStudentsApplicationComponent } from './application-management/manage-students-application/manage-students-application.component';
import { StudentActionDialogComponent } from './application-management/student-action-dialog/student-action-dialog.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'abouts', component: AboutComponent },
  { path: 'account/profile-update', component: ProfileUpdateComponent },
  { path: 'study-abroad-setup/country-setup', component: CountrySetupComponent },
  { path: 'study-abroad-setup/country-setup/add-country', component: AddCountryComponent },
  { path: 'study-abroad-setup/university-setup', component: UniversitySetupComponent },
  { path: 'study-abroad-setup/university-setup/add-university', component: AddUniversityComponent },
  { path: 'study-abroad-setup/course-setup', component: CourseSetupComponent },
  { path: 'study-abroad-setup/course-setup/add-course', component: AddCourseComponent },
  { path: 'application-management/manage-students-application', component: ManageStudentsApplicationComponent},
  { path: '**', redirectTo: '/home' }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    HomeComponent,
    AboutComponent,
    ProfileUpdateComponent,
    CountrySetupComponent,
    CourseSetupComponent,
    AddCountryComponent,
    AddUniversityComponent,
    UniversitySetupComponent,
    AddCourseComponent,
    ManageStudentsApplicationComponent,
    StudentActionDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule 
  ],
  entryComponents: [
    StudentActionDialogComponent, // Add dialog component to entryComponents in Angular 6
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
