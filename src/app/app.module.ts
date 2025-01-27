import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { MatExpansionModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProfileUpdateComponent } from './account/profile-update/profile-update.component';
import { CountrySetupComponent } from './study-abroad-setup/country-setup/country-setup.component';
import { CourseSetupComponent } from './study-abroad-setup/course-setup/course-setup.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'abouts', component: AboutComponent },
  { path: 'account/profile-update', component: ProfileUpdateComponent },
  { path: 'study-abroad-setup/country-setup', component: CountrySetupComponent },
  { path: 'study-abroad-setup/course-setup', component: CourseSetupComponent },
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
    CourseSetupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
