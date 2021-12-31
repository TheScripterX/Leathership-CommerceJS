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
