import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products! : Array<Product>;

  constructor() {
    this.products = [
      {id:1, name:'Computer', price: 6000, promotion: true},
      {id:2, name:'Mouse', price: 500, promotion: false},
      {id:3, name:'Keyboard', price: 100, promotion: true},
    ];
  }
  public getProducts() : Observable<Product[]> {
    let random = Math.random();
    if (random < 0.1) return throwError({message: 'connection error'})
    else return of(this.products);
  }

  public deleteProduct(id: number) : Observable<boolean> {
    this.products = this.products.filter(p => p.id !== id);
    return of(true);
 }

  public setPromotion(id: number, promotion: boolean) : Observable<boolean> {
    let product = this.products.find(p => p.id === id);
    if (product) {
      product.promotion = promotion;
      return of(true);
    }
    else return of(false);
  }
}
