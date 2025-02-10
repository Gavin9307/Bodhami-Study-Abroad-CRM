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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; 
import { MatGridListModule } from '@angular/material/grid-list';


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
import { LanguageSetupComponent } from './study-abroad-setup/language-setup/language-setup.component';
import { AddLanguageComponent } from './study-abroad-setup/add-language/add-language.component';
import { ManageStudentsApplicationComponent } from './application-management/manage-students-application/manage-students-application.component';
import { StudentActionDialogComponent } from './application-management/student-action-dialog/student-action-dialog.component';
import { StudentRegistrationComponent } from './application-management/student-registration/student-registration.component';
import { ChecklistSetupComponent } from './study-abroad-setup/checklist-setup/checklist-setup.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CountryActionComponent } from './study-abroad-setup/country-action/country-action.component';
import { ReviewComponent } from './Review/review/review.component';
import { AddTeamComponent } from './user-management/add-team/add-team.component';
import { DocumentSetupComponent } from './study-abroad-setup/document-setup/document-setup.component';
import { AddMemberComponent } from './user-management/add-member/add-member.component';
import { TeamActionComponent } from './user-management/team-action/team-action.component';
import { MemberListComponent } from './user-management/member-list/member-list.component';
import { EditStudentComponent } from './application-management/edit-student/edit-student.component';
import { EditTeamComponent } from './user-management/edit-team/edit-team.component';
import { MakeTeamComponent } from './user-management/make-team/make-team.component';
import { EditMemberComponent } from './user-management/edit-member/edit-member.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'account/profile-update', component: ProfileUpdateComponent },
  { path: 'Review/review', component: ReviewComponent },
  { path: 'study-abroad-setup/country-setup', component: CountrySetupComponent },
  { path: 'study-abroad-setup/country-setup/checklist-setup', component: ChecklistSetupComponent },
  { path: 'study-abroad-setup/country-setup/document-setup', component: DocumentSetupComponent },
  { path: 'study-abroad-setup/country-setup/add-country', component: AddCountryComponent },
  { path: 'study-abroad-setup/university-setup', component: UniversitySetupComponent },
  { path: 'study-abroad-setup/university-setup/add-university', component: AddUniversityComponent },
  { path: 'study-abroad-setup/course-setup', component: CourseSetupComponent },
  { path: 'study-abroad-setup/course-setup/add-course', component: AddCourseComponent },
  { path: 'study-abroad-setup/language-setup', component: LanguageSetupComponent },
  { path: 'study-abroad-setup/language-setup/add-language', component: AddLanguageComponent },
  { path: 'application-management/manage-students-application', component: ManageStudentsApplicationComponent},
  { path: 'application-management/edit-student', component: EditStudentComponent},
  { path: 'application-management/manage-students-application/student-registration', component: StudentRegistrationComponent},
  { path: 'user-management/add-team', component: AddTeamComponent },
  { path: 'user-management/add-team/member-list', component: MemberListComponent },
  { path: 'user-management/edit-team', component: EditTeamComponent },
  { path: 'user-management/add-team/edit-team', component: EditTeamComponent },
  { path: 'user-management/make-team', component: MakeTeamComponent },
  { path: 'user-management/add-team/add-member', component: AddMemberComponent },
  { path: 'user-management/member-list', component: MemberListComponent },
  { path: 'user-management/edit-member', component: EditMemberComponent }
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
    StudentActionDialogComponent,
    LanguageSetupComponent,
    AddLanguageComponent,
    ManageStudentsApplicationComponent,
    StudentRegistrationComponent,
    ChecklistSetupComponent,
    CountryActionComponent,
    ReviewComponent,
    AddTeamComponent,
    DocumentSetupComponent,
    AddMemberComponent,
    TeamActionComponent,
    MemberListComponent,
    EditStudentComponent,
    EditTeamComponent,
    MakeTeamComponent,
    EditMemberComponent
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
    MatDialogModule ,
    HttpClientModule,
    MatCheckboxModule,
    MatGridListModule,
    MatDividerModule,
    // FormBuilder,
    // FormGroup,
    // Validators,
    FormsModule,          
    ReactiveFormsModule, 
    MatIconModule 
  ],
  entryComponents: [
    StudentActionDialogComponent,
    CountryActionComponent,
    TeamActionComponent
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }