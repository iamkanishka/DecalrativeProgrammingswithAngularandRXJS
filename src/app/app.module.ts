import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PostComponent } from './pages/post/post.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { DeclarativePostsComponent } from './pages/declarative-posts/declarative-posts.component';
import { AlternativePostsComponent } from './pages/alternative-posts/alternative-posts.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AddPostComponent } from './components/add-post/add-post.component'
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostComponent,
    HomeComponent,
    DeclarativePostsComponent,
    AlternativePostsComponent,
    PostDetailsComponent,
    LoaderComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
     FormsModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
