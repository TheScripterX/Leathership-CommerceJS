import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
//
import { ProductService } from '../../../../services/product.service';
import { CartService } from '../../../../services/cart.service';
//
import {
  Product,
  Asset,
  Option,
  VariantGroup,
  VariantData,
  Cart,
  LineItem,
} from '../../../../models/commerce';
//
import { mapTo, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
//
// SwiperJS::Start
import SwiperCore, { Navigation, Thumbs } from 'swiper';
SwiperCore.use([Navigation, Thumbs]);
// SwiperJS::End

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SingleProductComponent implements OnInit, OnDestroy {
  thumbsSwiper: any;
  //
  product!: Product;
  assets!: Asset[];
  variantOptions!: Option[];
  variant_Group!: VariantGroup[];

  // Product Part
  productForm!: FormGroup;
  product_ID: string = 'No Value';
  product_Price!: string;
  variant_Group_ID: string = 'No Value';
  variant_Option_ID: string = 'No Value';
  variant_Data!: VariantData;

  // Cart Part
  total_Items!: number;
  cart_Items!: LineItem[];

  // RxJS Part
  subscriptions: Subscription = new Subscription();

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productId();
    this.initProductForm();
  }

  productId() {
    this.subscriptions.add(
      this.activeRoute.params
        .pipe(switchMap(({ id }) => this.productService.getProduct(id)))
        .subscribe((product) => {
          this.product = product;
          this.product_ID = product.id; // --> For binding with Product_Variant_Group
          this.variant_Group = product.variant_groups;
          this.assets = product.assets;
        })
    );
  }

  initProductForm() {
    this.productForm = this.fb.group({
      variant_Group_ID: ['', Validators.required],
      variant_Options_ID: ['', Validators.required],
      quantity: ['1', Validators.required],
    });
  }

  onVariantGroupChange(changes: any) {
    this.variant_Group_ID = changes.value;
    this.subscriptions.add(
      this.productService
        .getVariantGroupsOptions(this.product_ID, this.variant_Group_ID)
        .subscribe((data: VariantGroup) => {
          this.variantOptions = data.options;
        })
    );
  }

  onVariantOptionsChange(changes: any) {
    this.variant_Option_ID = changes.value;

    // Change price on Variant change.
    let findPrice = this.variantOptions.find(
      (option) => option.id === this.variant_Option_ID
    );
    this.product_Price = findPrice!.price.formatted_with_code;

    // Create Dynamic Object Key.
    this.variant_Data = {
      [this.variant_Group_ID]: this.variant_Option_ID,
    };
  }

  commander() {}

  addToCart() {
    const { quantity } = this.productForm.value;
    const sessionCart = sessionStorage.getItem('cart_Session');

    this.subscriptions.add(
      this.cartService
        .retrieveCart(sessionCart!)
        .pipe(
          switchMap(({ id: cart_ID }) => {
            console.log('SwitchMap', cart_ID);
            return this.cartService
              .addToCart(cart_ID, this.product_ID, quantity, this.variant_Data)
              .pipe(
                mapTo({ id: cart_ID }) // mapTo : to return the ID
              );
          }),
          switchMap(({ id: cart_ID }) => {
            return this.cartService.retrieveCart(cart_ID);
          })
        )
        .subscribe((cart) => {
          this.cart_Items = cart.line_items;
          this.total_Items = cart.total_unique_items;
          this.cartService._totalItems$.next(this.total_Items);
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
