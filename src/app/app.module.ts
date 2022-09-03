import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PostComponent } from './pages/post/post.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
