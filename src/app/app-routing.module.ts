import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeclarativePostsComponent } from './pages/declarative-posts/declarative-posts.component';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'posts',component:PostComponent},
  {path:'declarativePosts',component:DeclarativePostsComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
