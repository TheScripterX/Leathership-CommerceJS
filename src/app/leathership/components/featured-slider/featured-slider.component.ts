import { Component, OnInit } from '@angular/core';
import { commerce } from 'src/app/lib/commerce';

@Component({
  selector: 'app-featured-slider',
  templateUrl: './featured-slider.component.html',
  styleUrls: ['./featured-slider.component.scss'],
})
export class FeaturedSliderComponent implements OnInit {
  products: any;

  constructor() {}

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts() {
    await commerce.products
      .list()
      .then((product) => (this.products = product.data));

    console.log(this.products);
  }
}
