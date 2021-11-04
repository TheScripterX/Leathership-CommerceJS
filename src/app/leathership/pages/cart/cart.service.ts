import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, of, Subject } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cart, RootCart, VariantData, LineItem } from '../../models/commerce';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  _apiUrl = 'https://api.chec.io/v1';

  constructor(private http: HttpClient) {}
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Authorization': environment._commerceApi,
  });

  _totalItems$ = new BehaviorSubject<number>(0);

  initCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this._apiUrl}/carts`, {
      headers: this.headers,
    });
  }

  retrieveCart(cart_ID: string): Observable<Cart> {
    return this.http.get<Cart>(`${this._apiUrl}/carts/${cart_ID}`, {
      headers: this.headers,
    });
  }

  addToCart(
    cart_id: string,
    product_ID: string,
    quantity: number,
    variant_Data: VariantData
  ): Observable<Cart> {
    const body = {
      id: product_ID,
      quantity: quantity,
      options: variant_Data,
    };

    return this.http.post<Cart>(`${this._apiUrl}/carts/${cart_id}`, body, {
      headers: this.headers,
    });
  }

  getCartContents(cart: string): Observable<LineItem[]> {
    return this.http.get<LineItem[]>(`${this._apiUrl}/carts/${cart}/items`, {
      headers: this.headers,
    });
  }

  removeItemFromCart(cart_ID: string, item_ID: string): Observable<Cart> {
    return this.http.delete<Cart>(
      `${this._apiUrl}/carts/${cart_ID}/items/${item_ID}`,
      {
        headers: this.headers,
      }
    );
  }

  emptyCart(cart_ID: string): Observable<Cart> {
    return this.http.delete<Cart>(`${this._apiUrl}/carts/${cart_ID}/items`, {
      headers: this.headers,
    });
  }
}
