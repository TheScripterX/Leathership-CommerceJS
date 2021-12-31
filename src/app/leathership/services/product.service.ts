import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//
import { environment } from 'src/environments/environment';
import { RootVariants, Category } from '../models/commerce';
import {
  RootProduct,
  Product,
  RootVariantGroup,
  VariantGroup,
} from '../models/commerce';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  _apiUrl = 'https://api.chec.io/v1';
  _iPhoneCategory = 'cat_BkyN5YPL7o0b69';

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
  getProduct(id: string | null): Observable<Product> {
    return this.http.get<Product>(`${this._apiUrl}/products/${id}`, {
      headers: this.headers,
    });
  }

  getIPhoneCategories(): Observable<Category> {
    return this.http.get<Category>(
      `${this._apiUrl}/categories/${this._iPhoneCategory}`,
      {
        headers: this.headers,
      }
    );
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
}
