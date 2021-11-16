import {
  AfterContentChecked,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
//
import { ProductService } from '../../../../services/product.service';
//
// import Swiper core and required modules
import { SwiperOptions } from 'swiper';
import { Category, Child } from '../../../../models/commerce';
@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategorySliderComponent implements OnInit {
  // Product Part
  categories!: Child[];

  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 15,
    pagination: {
      clickable: true,
    },
    navigation: true,
    lazy: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      900: {
        slidesPerView: 3,
      },
    },
  };
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.productService
      .getIPhoneCategories()
      .subscribe((category: Category) => {
        this.categories = category.children;
      });
  }
}
