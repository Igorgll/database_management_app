import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainPageComponent } from './main-page/main-page.component';

import { HttpClientModule } from '@angular/common/http'
import {FormsModule} from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';


// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ClientsComponent } from './clients/clients.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MainPageComponent,
    ClientsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
