import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { IPost } from 'src/app/models/IPost';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) {}
   
  getPost(){
    return this.http.get<{[id:string]:IPost}>
    ('https://rxjs-posts-default-rtdb.firebaseio.com/posts.json')
  }
  
}
