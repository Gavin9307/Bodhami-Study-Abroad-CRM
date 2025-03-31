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
import { CountrySetupComponent } from './study-abroad-setup/country-setup/country-setup.component';
import { UniversitySetupComponent } from './study-abroad-setup/university-setup/university-setup.component';
import { CourseSetupComponent } from './study-abroad-setup/course-setup/course-setup.component';
import { AddCountryComponent } from './study-abroad-setup/add-country/add-country.component';
import { AddUniversityComponent } from './study-abroad-setup/add-university/add-university.component';
import { AddCourseComponent } from './study-abroad-setup/add-course/add-course.component';
import { LanguageSetupComponent } from './study-abroad-setup/language-setup/language-setup.component';
import { AddLanguageComponent } from './study-abroad-setup/add-language/add-language.component';
import { ManageStudentsApplicationComponent } from './application-management/manage-students-application/manage-students-application.component';
import { StudentActionDialogComponent } from './application-management/student-action-dialog/student-action-dialog.component';
import { StudentRegistrationComponent } from './application-management/student-registration/student-registration.component';
import { ChecklistSetupComponent } from './study-abroad-setup/checklist-setup/checklist-setup.component';
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
import { LoaderComponent } from './shared/loader/loader.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { SignupPopupComponent } from './auth/signup-popup/signup-popup.component';
import { StudyAbroadAnalysisComponent } from './study-abroad-analysis/study-abroad-analysis/study-abroad-analysis.component';
import { EditChecklistComponent } from './study-abroad-setup/edit-checklist/edit-checklist.component';
import { AddChecklistComponent } from './study-abroad-setup/add-checklist/add-checklist.component';
import { TeamSetupComponent } from './study-abroad-setup/team-setup/team-setup.component';
import { ProfileActionComponent } from './Profile-action/profile-action/profile-action.component';
import { CreateApplicationComponent } from './application-management/create-application/create-application.component';
import { ApplicationComponent } from './application-management/application/application.component';


import { AuthGuard } from './auth.guard';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ViewApplicationComponent } from './application-management/view-application/view-application.component';
import { viewParentEl } from '@angular/core/src/view/util';
import { ApplicationActionComponent } from './application-management/application-action/application-action.component';

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
      { path: 'study-abroad-analysis/study-abroad-analysis', component: StudyAbroadAnalysisComponent },
      
      // Study Abroad Setup Routes
      {
        path: 'study-abroad-setup',
        children: [
          { path: 'country-setup', component: CountrySetupComponent },
          { path: 'country-setup/add-country', component: AddCountryComponent },
          { path: 'country-setup/checklist-setup', component: ChecklistSetupComponent },
          { path: 'country-setup/document-setup', component: DocumentSetupComponent },
          
          { path: 'checklist-setup', component: ChecklistSetupComponent },
          { path: 'checklist-setup/edit-checklist/:id', component: EditChecklistComponent },
          { path: 'checklist-setup/add-checklist', component: AddChecklistComponent },
          
          { path: 'university-setup', component: UniversitySetupComponent },
          { path: 'university-setup/add-university', component: AddUniversityComponent },
          
          { path: 'course-setup', component: CourseSetupComponent },
          { path: 'course-setup/add-course', component: AddCourseComponent },
          
          { path: 'language-setup', component: LanguageSetupComponent },
          { path: 'language-setup/add-language', component: AddLanguageComponent }
        ]
      },
      
      // Application Management Routes
      {
        path: 'application-management',
        children: [
          { path: 'manage-students-application', component: ManageStudentsApplicationComponent },
          { path: 'edit-student', component: EditStudentComponent },
          { path: 'view-application', component: ViewApplicationComponent },
          { path: 'application', component: ApplicationComponent },
          { path: 'create-application', component: CreateApplicationComponent },
          { path: 'manage-students-application/student-registration', component: StudentRegistrationComponent }
        ]
      },
      
      // User Management Routes
      {
        path: 'user-management',
        children: [
          { path: 'add-team', component: AddTeamComponent },
          { path: 'add-member', component: AddMemberComponent },
          { path: 'add-team/member-list', component: MemberListComponent },
          { path: 'edit-team', component: EditTeamComponent },
          { path: 'add-team/edit-team', component: EditTeamComponent },
          { path: 'make-team', component: MakeTeamComponent },
          { path: 'add-team/add-member', component: AddMemberComponent },
          { path: 'member-list', component: MemberListComponent },
          { path: 'edit-member/:id', component: EditMemberComponent }
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
    ManageStudentsApplicationComponent,
    StudentActionDialogComponent,
    LanguageSetupComponent,
    AddLanguageComponent,
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
    TeamSetupComponent,
    ProfileActionComponent,
    CreateApplicationComponent,
    ApplicationComponent,
    ViewApplicationComponent,
    ApplicationActionComponent
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
    ApplicationActionComponent
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }