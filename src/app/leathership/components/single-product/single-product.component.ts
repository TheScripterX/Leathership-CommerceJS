import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { commerce } from 'src/app/lib/commerce';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SingleProductComponent implements OnInit {
  product: any;

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('Hello World');
    this.getRouteId();
  }

  async getRouteId() {
    await this.activeRoute.params.subscribe(({ id }) => {
      commerce.products
        .retrieve(id)
        .then((product) => (this.product = product))
        .finally(() => console.log('Promise Finished'));
    });
  }
}
