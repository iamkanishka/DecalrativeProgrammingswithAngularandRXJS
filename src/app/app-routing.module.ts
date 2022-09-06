import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeclaraticeAddPostComponent } from './components/declaratice-add-post/declaratice-add-post.component';
import { AlternativePostsComponent } from './pages/alternative-posts/alternative-posts.component';
import { DeclarativePostsComponent } from './pages/declarative-posts/declarative-posts.component';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'posts',component:PostComponent},
  {path:'declarativePosts',component:DeclarativePostsComponent},
  {path:'declarativePosts/add',component:DeclaraticeAddPostComponent},
  {path:'declarativePosts/edit/:id',component:DeclaraticeAddPostComponent},
   {path:'AletrnativePosts',component:AlternativePostsComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
