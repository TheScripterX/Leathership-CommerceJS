import { Component, OnInit, ViewEncapsulation } from '@angular/core';
//
import { Product, RootProduct } from '../../models/commerce';
import { ProductService } from '../../services/product.service';

import SwiperCore, {
  SwiperOptions,
  Navigation,
  Scrollbar,
  Autoplay,
} from 'swiper';

SwiperCore.use([Navigation, Scrollbar, Autoplay]);

@Component({
  selector: 'app-featured-slider',
  templateUrl: './featured-slider.component.html',
  styleUrls: ['./featured-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FeaturedSliderComponent implements OnInit {
  config: SwiperOptions = {
    slidesPerView: 3,
    loop: true,
    spaceBetween: 30,
    navigation: true,
    pagination: {
      clickable: true,
    },
    breakpoints: {
      '300': {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      '768': {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      '991': {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  };
  products!: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  // async getProducts() {
  //   await commerce.products
  //     .list()
  //     .then((product) => (this.products = product.data));
  // }

  getProducts() {
    this.productService.getAllProducts().subscribe((data: RootProduct) => {
      this.products = data.data;
    });
  }
}
