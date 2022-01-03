import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
//
import { Cart } from '../models/commerce';
//
import { CartService } from '../services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class CartResolveService implements Resolve<Cart> {
  constructor(private cartService: CartService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Cart | Observable<Cart> | Promise<Cart> {
    const cart_Session = sessionStorage.getItem('cart_Session');
    return this.cartService.retrieveCart(cart_Session!);
  }
}

// export class CategoriesResolveService implements Resolve<Category> {
//   constructor(private productService: ProductService) {}

//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Category | Observable<Category> | Promise<Category> {
//     return this.productService.getIPhoneCategories();
//   }
// }

// export class CheckoutResolveService implements Resolve<Checkout> {
//   constructor(private checkoutService: CheckoutService) {}

//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Checkout | Observable<Checkout> | Promise<Checkout> {
//     const checkout_ID = route.paramMap.get('id');
//     return this.checkoutService.initCheckout(checkout_ID!);
//   }
// }

// export class CollectionsResolveService implements Resolve<RootProduct> {
//   constructor(private productService: ProductService) {}

//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): RootProduct | Observable<RootProduct> | Promise<RootProduct> {
//     return this.productService.getAllProducts();
//   }
// }

// export class InvoiceResolveService implements Resolve<Order> {
//   constructor(private checkoutService: CheckoutService) {}

//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Order | Observable<Order> | Promise<Order> {
//     const checkout_ID = route.paramMap.get('id');

//     return this.checkoutService.initInvoice(checkout_ID!);
//   }
// }

// export class ProductResolveService implements Resolve<Product> {
//   constructor(private productService: ProductService) {}

//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Product | Observable<Product> | Promise<Product> {
//     return this.productService.getProduct(route.paramMap.get('id'));
//   }
// }
