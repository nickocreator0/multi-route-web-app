import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import {AppRoutingModule} from "./app-routing.module";
import { FibonacciComponent } from './fibonacci/fibonacci.component';
import { RedditComponent } from './reddit/reddit.component';
import { RedditArticleComponent } from './reddit-article/reddit-article.component';
import { StudentsComponent } from './students/students.component';
import {HttpClientModule} from "@angular/common/http";
import { AddressesComponent } from './addresses/addresses.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TeamsComponent } from './teams/teams.component';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {UserComponent} from "./user/user.component";
import {AdminComponent} from "./admin/admin.component";

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroDetailComponent,
    MessagesComponent,
    FibonacciComponent,
    RedditComponent,
    RedditArticleComponent,
    StudentsComponent,
    AddressesComponent,
    AccountsComponent,
    TeamsComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
