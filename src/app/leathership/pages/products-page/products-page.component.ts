import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
//
import { Product } from 'src/app/leathership/models/commerce';
//
import striptags from 'striptags';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {
  products: Product[] = [];

  // RxJS Part
  subscriptions: Subscription = new Subscription();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.subscriptions.add(
      this.route.data
        .pipe(
          map((data) =>
            data.collections.data.map((product: Product) => ({
              ...product,
              description: striptags(product.description),
            }))
          )
        )
        .subscribe({
          next: (res: Product[]) => (this.products = res),
          error: (err) => console.warn('Error on getProducts method. ', err),
          complete: () => console.info('getProducts Complete.'),
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
