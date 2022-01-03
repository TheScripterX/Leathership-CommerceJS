import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
//
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//
import { RootProduct } from '../models/commerce';
//
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root',
})
export class CollectionsResolveService implements Resolve<RootProduct> {
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): RootProduct | Observable<RootProduct> | Promise<RootProduct> {
    return this.productService.getAllProducts();
  }
}
