import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
//
import { Order } from '../models/commerce';
//
import { CheckoutService } from '../services/checkout.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceResolveService implements Resolve<Order> {
  constructor(private checkoutService: CheckoutService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Order | Observable<Order> | Promise<Order> {
    const checkout_ID = route.paramMap.get('id');

    return this.checkoutService.initInvoice(checkout_ID!);
  }
}
