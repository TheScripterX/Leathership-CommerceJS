import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//
import { Subscription } from 'rxjs';
//
import { Product } from 'src/app/leathership/models/commerce';
//

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
      this.route.data.subscribe(
        (data) => {
          this.products = data['collections'].data;
        },

        (err) => {
          console.warn('Error on Collections Resolve : ', err);
        },

        () => {
          console.info('Success Collections');
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
