import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//
import { environment } from 'src/environments/environment';
import { Cart, RootVariants, RootCart, VariantData } from '../models/commerce';
import {
  RootProduct,
  Product,
  RootVariantGroup,
  VariantGroup,
} from '../models/commerce';

@Injectable({
  providedIn: 'root',
})
export class CommercejsService {
  _apiUrl = 'https://api.chec.io/v1';

  constructor(private http: HttpClient) {}
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Authorization': environment._commerceApi,
  });

  getAllProducts(): Observable<RootProduct> {
    return this.http.get<RootProduct>(`${this._apiUrl}/products`, {
      headers: this.headers,
    });
  }
  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this._apiUrl}/products/${id}`, {
      headers: this.headers,
    });
  }

  getVariants(productId: string): Observable<RootVariants> {
    return this.http.get<RootVariants>(
      `${this._apiUrl}/products/${productId}/variants`,
      { headers: this.headers }
    );
  }

  getVariantGroups(id: string): Observable<RootVariantGroup> {
    return this.http.get<RootVariantGroup>(
      `${this._apiUrl}/products/${id}/variant_groups`,
      {
        headers: this.headers,
      }
    );
  }

  getVariantGroupsOptions(
    productId: string,
    variantId: string
  ): Observable<VariantGroup> {
    return this.http.get<VariantGroup>(
      `${this._apiUrl}/products/${productId}/variant_groups/${variantId}`,
      { headers: this.headers }
    );
  }

  generateCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this._apiUrl}/carts`, {
      headers: this.headers,
    });
  }
  retrieveCart(id: string): Observable<Cart> {
    return this.http.get<Cart>(`${this._apiUrl}/carts/${id}`, {
      headers: this.headers,
    });
  }

  addToCart(
    cart_id: string,
    product_ID: string,
    quantity: number,
    variant_Data: VariantData
  ): Observable<RootCart> {
    const body = {
      id: product_ID,
      quantity: quantity,
      options: variant_Data,
    };
    return this.http.post<RootCart>(`${this._apiUrl}/carts/${cart_id}`, body, {
      headers: this.headers,
    });
  }
}
