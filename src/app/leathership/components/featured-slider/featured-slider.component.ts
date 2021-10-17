import { Component, OnInit, ViewEncapsulation } from '@angular/core';
//
import { commerce } from 'src/app/lib/commerce';
//
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
    spaceBetween: 30,
    navigation: true,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
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
