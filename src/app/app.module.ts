import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { PreviewChangesComponent } from './preview-changes/preview-changes.component';

/**
 * Main Module where we declare all our components, pipes, angular modules 
 * used in our application
 */
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CreateNewsComponent,
    FormatDatePipe,
    PreviewChangesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
