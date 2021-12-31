import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
//
import { Checkout } from '../models/commerce';
//
import { CheckoutService } from '../services/checkout.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutResolveService implements Resolve<Checkout> {
  constructor(private checkoutService: CheckoutService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Checkout | Observable<Checkout> | Promise<Checkout> {
    const checkout_ID = route.paramMap.get('id');
    return this.checkoutService.initCheckout(checkout_ID!);
  }
}
