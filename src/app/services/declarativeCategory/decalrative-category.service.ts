import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from 'src/app/models/Icategory';
import {map, shareReplay} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class DecalrativeCategoryService {
  
  category$ = this.http.get<{[id:string]:ICategory}>
  ('https://rxjs-posts-default-rtdb.firebaseio.com/categories.json').pipe(map((categories)=>{
    let categoriesData:ICategory[]=[]
    for(let id in categories){
      categoriesData.push({...categories[id],id});
    }
    return categoriesData
  }),shareReplay());
  constructor(private http:HttpClient) { }
}
