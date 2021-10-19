import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { commerce } from 'src/app/lib/commerce';

// import Swiper core and required modules
import SwiperCore, { Navigation, SwiperOptions, Thumbs } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Thumbs]);

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SingleProductComponent implements OnInit {
  thumbsSwiper: any;

  products: any;
  assets: any;
  //

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getRouteId();
    console.log(this.assets);
  }

  async getRouteId() {
    await this.activeRoute.params.subscribe(({ id }) => {
      commerce.products
        .retrieve(id)
        .then((product) => (this.products = product))
        .then((assets) => (this.assets = assets.assets))
        .finally(() => console.log('Promise Finished', this.assets));
    });
  }
}
