import { Component, OnInit } from '@angular/core';
//
import { CommercejsService } from '../../services/commercejs.service';
import { Product, RootProduct } from '../../models/commerce';

@Component({
  selector: 'app-exclusive-product',
  templateUrl: './exclusive-product.component.html',
  styleUrls: ['./exclusive-product.component.scss'],
})
export class ExclusiveProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private commerce: CommercejsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.commerce.getAllProducts().subscribe(
      (product: RootProduct) => {
        this.products = product.data;
      },

      (err) => {
        console.error(err);
      },

      () => {
        console.log(' Exclusive Products Works!');
      }
    );
  }
}
