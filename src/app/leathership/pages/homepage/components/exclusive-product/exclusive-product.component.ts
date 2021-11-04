import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
//
import { Product, RootProduct } from 'src/app/leathership/models/commerce';
//
import { ProductService } from 'src/app/leathership/services/product.service';

@Component({
  selector: 'app-exclusive-product',
  templateUrl: './exclusive-product.component.html',
  styleUrls: ['./exclusive-product.component.scss'],
})
export class ExclusiveProductComponent implements OnInit, OnDestroy {
  products: Product[] = [];

  // RxJS Part
  subscriptions: Subscription = new Subscription();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.subscriptions.add(
      this.productService.getAllProducts().subscribe(
        (product: RootProduct) => {
          this.products = product.data;
        },

        (err) => {
          console.error(err);
        },

        () => {
          console.log(' Exclusive Products Works!');
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
