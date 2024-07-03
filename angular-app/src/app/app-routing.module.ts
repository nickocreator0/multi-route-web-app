import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import {FibonacciComponent} from "./fibonacci/fibonacci.component";
import {RedditComponent} from "./reddit/reddit.component";
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import {StudentsComponent} from "./students/students.component";
import {HomeComponent} from "./home/home.component";
import {UserComponent} from "./user/user.component";
import {RoleGuard} from "./guards/role.guard";
import {authGuard} from "./guards/auth.guard";
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  // path: a string that matches the URL in the browser address bar
  // component: The component that the router should create when navigating to this route
  { path: 'heroes', component: HeroesComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'fibonacci', component: FibonacciComponent },
  { path: 'reddit', component: RedditComponent},//, canActivate: [authGuard], data: { roles: ['ROLE_USER, ROLE_ADMIN'] }, },
  { path: 'students', component: StudentsComponent, canActivate: [authGuard], data: { roles: ['ROLE_ADMIN'] },},
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_USER','ROLE_ADMIN'] },},
  { path: 'admin', component: AdminComponent, canActivate: [authGuard], data: { roles: ['ROLE_ADMIN'] },},
  { path: 'auth/login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent }
];

@NgModule({
  /* Adds the RouterModule to the AppRoutingModule, imports array and configures
     it with the routes in one step by calling RouterModule.forRoot() */
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
