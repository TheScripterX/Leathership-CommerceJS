import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
//
import { Category } from '../models/commerce';
//
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesResolveService implements Resolve<Category> {
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Category | Observable<Category> | Promise<Category> {
    return this.productService.getIPhoneCategories();
  }
}
