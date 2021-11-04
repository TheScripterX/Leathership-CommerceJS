import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
//
import { Subscription } from 'rxjs';
//
import { Product, RootProduct } from 'src/app/leathership/models/commerce';
import { ProductService } from 'src/app/leathership/services/product.service';

// Swipper::Start
import SwiperCore, {
  SwiperOptions,
  Navigation,
  Scrollbar,
  Autoplay,
} from 'swiper';

SwiperCore.use([Navigation, Scrollbar, Autoplay]);
// Swipper::End

@Component({
  selector: 'app-featured-slider',
  templateUrl: './featured-slider.component.html',
  styleUrls: ['./featured-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FeaturedSliderComponent implements OnInit, OnDestroy {
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

  // Products Part
  products!: Product[];

  // RxJS Part
  subscriptions: Subscription = new Subscription();

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
    this.subscriptions.add(
      this.productService.getAllProducts().subscribe((data: RootProduct) => {
        this.products = data.data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
