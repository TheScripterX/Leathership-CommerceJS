import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
//
import { environment } from 'src/environments/environment';
//
import { Observable } from 'rxjs';
//
import { Checkout } from '../models/commerce';

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
}
