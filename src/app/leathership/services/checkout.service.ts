import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
//
import { environment } from 'src/environments/environment';
//
import { Observable } from 'rxjs';
//
import {
  Checkout,
  Order,
  LineItemsData,
  Shipping,
  Test_Gateway,
  captureOrder,
} from '../models/commerce';
import { Customer } from '@chec/commerce.js/types/customer';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  _apiUrl = 'https://api.chec.io/v1';

  constructor(private http: HttpClient) {}
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Authorization': environment._commerceApi,
  });

  private params = new HttpParams().set('type', 'cart');

  initCheckout(cart_ID: string): Observable<Checkout> {
    return this.http.get<Checkout>(`${this._apiUrl}/checkouts/${cart_ID}`, {
      headers: this.headers,
      params: this.params,
    });
  }

  captureOrder(
    checkout_ID: string,
    lineItemsObject: LineItemsData[],
    customer: Customer,
    shipping: Shipping,
    payment: Test_Gateway
  ): Observable<captureOrder> {
    const body = {
      line_items: lineItemsObject,
      customer: customer,
      shipping: shipping,
      payment: payment,
    };

    return this.http.post<captureOrder>(
      `${this._apiUrl}/checkouts/${checkout_ID}`,
      body,
      {
        headers: this.headers,
      }
    );
  }

  initInvoice(order_ID: string): Observable<Order> {
    return this.http.get<Order>(`${this._apiUrl}/orders/${order_ID}`, {
      headers: this.headers,
    });
  }
}
