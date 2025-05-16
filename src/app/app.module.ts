import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProfileUpdateComponent } from './account/profile-update/profile-update.component';
import { CountrySetupComponent } from './study-abroad-setup/country/country-setup/country-setup.component';
import { UniversitySetupComponent } from './study-abroad-setup/university/university-setup/university-setup.component';
import { CourseSetupComponent } from './study-abroad-setup/course/course-setup/course-setup.component';
import { AddCountryComponent } from './study-abroad-setup/country/add-country/add-country.component';
import { AddUniversityComponent } from './study-abroad-setup/university/add-university/add-university.component';
import { AddCourseComponent } from './study-abroad-setup/course/add-course/add-course.component';
import { LanguageSetupComponent } from './study-abroad-setup/language-setup/language-setup.component';
import { AddLanguageComponent } from './study-abroad-setup/add-language/add-language.component';
import { StudentActionDialogComponent } from './application-management/student-action-dialog/student-action-dialog.component';
import { StudentRegistrationComponent } from './application-management/student-registration/student-registration.component';
import { ChecklistSetupComponent } from './study-abroad-setup/checklist/checklist-setup/checklist-setup.component';
import { CountryActionComponent } from './study-abroad-setup/country/country-action/country-action.component';
import { ReviewComponent } from './Review/review/review.component';
import { AddTeamComponent } from './user-management/add-team/add-team.component';

import { AddMemberComponent } from './user-management/add-member/add-member.component';
import { TeamActionComponent } from './user-management/team-action/team-action.component';
import { MemberListComponent } from './user-management/member-list/member-list.component';
import { EditStudentComponent } from './application-management/edit-student/edit-student.component';
import { EditTeamComponent } from './user-management/edit-team/edit-team.component';
import { MakeTeamComponent } from './user-management/make-team/make-team.component';
import { EditMemberComponent } from './user-management/edit-member/edit-member.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { SignupPopupComponent } from './auth/signup-popup/signup-popup.component';
import { StudyAbroadAnalysisComponent } from './study-abroad-analysis/study-abroad-analysis/study-abroad-analysis.component';
import { EditChecklistComponent } from './study-abroad-setup/checklist/edit-checklist/edit-checklist.component';
import { AddChecklistComponent } from './study-abroad-setup/checklist/add-checklist/add-checklist.component';

import { ProfileActionComponent } from './Profile-action/profile-action/profile-action.component';
import { CreateApplicationComponent } from './application-management/create-application/create-application.component';
import { ApplicationComponent } from './application-management/application/application.component';


import { AuthGuard } from './auth.guard';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { viewParentEl } from '@angular/core/src/view/util';
import { ApplicationActionComponent } from './application-management/application-action/application-action.component';
import { TeamListComponent } from './user-management/team-list/team-list.component';
import { AddTeamMemberComponent } from './user-management/add-team-member/add-team-member.component';
import { AddTeamMemberActionComponent } from './user-management/add-team-member-action/add-team-member-action.component';
import { StudentListComponent } from './student-management/student-list/student-list.component';
import { StudentAddComponent } from './student-management/student-add/student-add.component';
import { StudentViewComponent } from './student-management/student-view/student-view.component';
import { StudentActionComponent } from './student-management/student-action/student-action.component';
import { DocumentTypeSetupComponent } from './study-abroad-setup/document-type/document-type-setup/document-type-setup.component';
import { AddDocumentTypeComponent } from './study-abroad-setup/document-type/add-document-type/add-document-type.component';
import { EditDocumentTypeComponent } from './study-abroad-setup/document-type/edit-document-type/edit-document-type.component';
import { EditCountryComponent } from './study-abroad-setup/country/edit-country/edit-country.component';
import { CountryChecklistSetupComponent } from './study-abroad-setup/country/country-checklist/country-checklist-setup/country-checklist-setup.component';
import { UniversityActionComponent } from './study-abroad-setup/university/university-action/university-action.component';
import { EditUniversityComponent } from './study-abroad-setup/university/edit-university/edit-university.component';
import { CourseActionComponent } from './study-abroad-setup/course/course-action/course-action.component';
import { EditCourseComponent } from './study-abroad-setup/course/edit-course/edit-course.component';
import { UniversityChecklistComponent } from './study-abroad-setup/university/university-checklist/university-checklist.component';
import { ApplicationListComponent } from './application-management/application-list/application-list.component';
import { ApplicationViewComponent } from './application-management/application-view/application-view.component';
import { ApplicationCountryChecklistListComponent } from './application-management/Application Countries/application-country-checklist-list/application-country-checklist-list.component';
import { ApplicationCountryChecklistDocumentListComponent } from './application-management/Application Countries/application-country-checklist-document-list/application-country-checklist-document-list.component';
import { ApplicationViewCountryActionComponent } from './application-management/application-view-country-action/application-view-country-action.component';
import { ApplicationCountryUniversityListComponent } from './application-management/Application Countries/application-country-university-list/application-country-university-list.component';
import { ApplicationCountryUniversityActionComponent } from './application-management/Application Countries/application-country-university-action/application-country-university-action.component';
import { ApplicationCountryChecklistActionComponent } from './application-management/Application Countries/application-country-checklist-action/application-country-checklist-action.component';
import { ApplicationCountryUniversityChecklistActionComponent } from './application-management/Application Countries/application-country-university-checklist-action/application-country-university-checklist-action.component';
import { ApplicationCountryUniversityChecklistListComponent } from './application-management/Application Countries/application-country-university-checklist-list/application-country-university-checklist-list.component';
import { ApplicationCountryUniversityCourseListComponent } from './application-management/Application Countries/application-country-university-course-list/application-country-university-course-list.component';
import { ApplicationCountryUniversityCourseActionComponent } from './application-management/Application Countries/application-country-university-course-action/application-country-university-course-action.component';
import { ApplicationCreateComponent } from './application-management/application-create/application-create.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { ChartsModule } from 'ng2-charts';
import { ApplicationCountryUniversityChecklistDocumentListComponent } from './application-management/Application Countries/application-country-university-checklist-document-list/application-country-university-checklist-document-list.component';
import { ChecklistActionComponent } from './study-abroad-setup/checklist/checklist-action/checklist-action.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'password-reset', component: PasswordResetComponent }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'account/profile-update', component: ProfileUpdateComponent },
      { path: 'Review/review', component: ReviewComponent },
      { path: 'study-abroad-analysis/dashboard', component: StudyAbroadAnalysisComponent },

      // Study Abroad Setup Routes
      {
        path: 'study-abroad-setup',
        children: [
          { path: 'country-setup', component: CountrySetupComponent },
          { path: 'country-setup/add-country', component: AddCountryComponent },
          { path: 'country-setup/edit-country/:id', component: EditCountryComponent },
          { path: 'country-setup/country-checklist-setup/:id', component: CountryChecklistSetupComponent },

          { path: 'checklist-setup', component: ChecklistSetupComponent },
          { path: 'checklist-setup/edit-checklist/:id', component: EditChecklistComponent },
          { path: 'checklist-setup/add-checklist', component: AddChecklistComponent },

          { path: 'university-setup', component: UniversitySetupComponent },
          { path: 'university-setup/add-university', component: AddUniversityComponent },
          { path: 'university-setup/edit-university/:id', component: EditUniversityComponent },
          { path: 'university-setup/university-checklist-setup/:id', component: UniversityChecklistComponent },

          { path: 'course-setup', component: CourseSetupComponent },
          { path: 'course-setup/add-course', component: AddCourseComponent },
          { path: 'course-setup/edit-course/:id', component: EditCourseComponent },

          { path: 'language-setup', component: LanguageSetupComponent },
          { path: 'language-setup/add-language', component: AddLanguageComponent },

          { path: 'document-type-setup', component: DocumentTypeSetupComponent },
          { path: 'document-type-setup/edit-document-type/:id', component: EditDocumentTypeComponent },
          { path: 'document-type-setup/add-document-type', component: AddDocumentTypeComponent }

        ]
      },

      // Application Management Routes
      {
        path: 'application-management',
        children: [
          { path: 'application-create', component: ApplicationCreateComponent },
          { path: 'application-list', component: ApplicationListComponent },
          { path: 'edit-student', component: EditStudentComponent },
          { path: 'application-view/:id', component: ApplicationViewComponent },
          { path: 'application', component: ApplicationComponent },
          { path: 'create-application', component: CreateApplicationComponent },
          { path: 'manage-students-application/student-registration', component: StudentRegistrationComponent },
          {
            path: 'country/:countryId/university-list/:appId',
            component: ApplicationCountryUniversityListComponent
          },
          {
            path: 'country/:countryId/checklist-list/:appId',
            component: ApplicationCountryChecklistListComponent
          },
          {
            path: 'country/:countryId/checklist/:checklistId/countrychecklist/:countryChecklistId/document-list/:appId',
            component: ApplicationCountryChecklistDocumentListComponent
          },
          {
            path: 'country/:countryId/university/:universityId/checklist-list/:appId',
            component: ApplicationCountryUniversityChecklistListComponent
          },
          {
            path: 'country/:countryId/university/:universityId/checklist/:checklistId/universityChecklist/:universityChecklistId/document-list/:appId',
            component: ApplicationCountryUniversityChecklistDocumentListComponent
          },
          {
            path: 'country/:countryId/university/:universityId/course-list/:appId',
            component: ApplicationCountryUniversityCourseListComponent
          }
        ]
      },

      // User Management Routes
      {
        path: 'user-management',
        children: [
          { path: 'team-list', component: TeamListComponent },
          { path: 'add-team', component: AddTeamComponent },

          { path: 'team-list/add-member/:id', component: AddTeamMemberComponent },
          { path: 'team-list/edit-team/:id', component: EditTeamComponent },


          { path: 'add-member', component: AddMemberComponent },
          { path: 'member-list', component: MemberListComponent },
          { path: 'edit-member/:id', component: EditMemberComponent }
        ]
      },
      // Student Management Routes
      {
        path: 'student-management',
        children: [
          { path: 'student-list', component: StudentListComponent },
          { path: 'student-view/:id', component: StudentViewComponent },
          { path: 'student-add', component: StudentAddComponent }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [
    // All components from the original declarations
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
    StudentActionDialogComponent,
    LanguageSetupComponent,
    AddLanguageComponent,
    StudentRegistrationComponent,
    ChecklistSetupComponent,
    CountryActionComponent,
    ReviewComponent,
    AddTeamComponent,
    AddMemberComponent,
    TeamActionComponent,
    MemberListComponent,
    EditStudentComponent,
    EditTeamComponent,
    MakeTeamComponent,
    EditMemberComponent,
    LoaderComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    LoginComponent,
    PasswordResetComponent,
    SignupPopupComponent,
    StudyAbroadAnalysisComponent,
    EditChecklistComponent,
    AddChecklistComponent,
    ProfileActionComponent,
    CreateApplicationComponent,
    ApplicationComponent,
    ApplicationActionComponent,
    TeamListComponent,
    AddTeamMemberComponent,
    AddTeamMemberActionComponent,
    StudentListComponent,
    StudentAddComponent,
    StudentViewComponent,
    StudentActionComponent,
    DocumentTypeSetupComponent,
    AddDocumentTypeComponent,
    EditDocumentTypeComponent,
    EditCountryComponent,
    CountryChecklistSetupComponent,
    UniversityActionComponent,
    EditUniversityComponent,
    CourseActionComponent,
    EditCourseComponent,
    UniversityChecklistComponent,
    ApplicationListComponent,
    ApplicationViewComponent,
    ApplicationCountryChecklistListComponent,
    ApplicationCountryChecklistDocumentListComponent,
    ApplicationViewCountryActionComponent,
    ApplicationCountryUniversityListComponent,
    ApplicationCountryUniversityActionComponent,
    ApplicationCountryChecklistActionComponent,
    ApplicationCountryUniversityChecklistActionComponent,
    ApplicationCountryUniversityChecklistListComponent,
    ApplicationCountryUniversityCourseListComponent,
    ApplicationCountryUniversityCourseActionComponent,
    ApplicationCreateComponent,
    BackButtonComponent,
    ApplicationCountryUniversityChecklistDocumentListComponent,
    ChecklistActionComponent
  ],
  imports: [
    // Core Angular Modules
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // Material Modules
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatCheckboxModule,
    MatGridListModule,
    MatDividerModule,
    MatIconModule,
    MatPaginatorModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    ChartsModule,

    // Additional Module
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    })

  ],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [
    StudentActionDialogComponent,
    CountryActionComponent,
    TeamActionComponent,
    SignupPopupComponent,
    ProfileActionComponent,
    AddTeamMemberActionComponent,
    ApplicationActionComponent,
    StudentActionComponent,
    UniversityActionComponent,
    CourseActionComponent,
    ApplicationViewCountryActionComponent,
    ApplicationCountryUniversityActionComponent,
    ApplicationCountryChecklistActionComponent,
    ApplicationCountryUniversityChecklistActionComponent,
    ChecklistActionComponent
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }