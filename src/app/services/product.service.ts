import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Product} from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
 private apiurl='https://fakestoreapi.com/products';

 
  getProductList():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiurl);
  }

  getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(`${this.apiurl}/${id}`);
  }
}
