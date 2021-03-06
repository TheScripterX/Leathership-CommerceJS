import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
//
import { DialogService } from '@ngneat/dialog';
//
import { mapTo, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
//
import { ModalComponent } from 'src/app/shared/modal/modal.component';
//
import {
  Asset,
  Cart,
  Product,
  Option,
  VariantGroup,
  VariantData,
  LineItem,
} from '../../models/commerce';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
// SwiperJS::Start
import SwiperCore, { Navigation, Thumbs } from 'swiper';
import striptags from 'striptags';

SwiperCore.use([Navigation, Thumbs]);
// SwiperJS::End

@Component({
  selector: 'app-single-page-product',
  templateUrl: './single-page-product.component.html',
  styleUrls: ['./single-page-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SinglePageProductComponent implements OnInit, OnDestroy {
  // For Modal Popup
  cartModal!: Cart;

  // Spinner Part
  loading$: boolean = false;

  // SwiperJS
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
  product_Description!: string;
  variant_Group_ID: string = 'No Value';
  variant_Option_ID: string = 'No Value';
  variant_Data!: VariantData;

  // Cart Part
  total_Items!: number;
  cart_Items!: LineItem[];

  // RxJS Part
  subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private dialog: DialogService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getProductId();
    this.initProductForm();
  }

  getProductId() {
    this.subscriptions.add(
      this.route.data.subscribe((data) => {
        this.product = data.product;
        this.product_ID = this.product.id; // --> For binding with Product_Variant_Group
        this.product_Description = striptags(this.product.description); // --> Stripetags HTML for Description
        this.variant_Group = this.product.variant_groups;
        this.assets = this.product.assets;
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

  addToCart() {
    const { quantity } = this.productForm.value;
    const sessionCart = sessionStorage.getItem('cart_Session');
    this.loading$ = true;
    this.subscriptions.add(
      this.cartService
        .retrieveCart(sessionCart!)
        .pipe(
          switchMap(({ id: cart_ID }) => {
            // console.log('SwitchMap', cart_ID);

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
          this.cart_Items = cart.line_items; // For Checkout
          this.total_Items = cart.total_unique_items;
          this.cartService._totalItems$.next(this.total_Items); // For Navbar Cart
        })
    );
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        //TODO: Cart & Product
        product_name: this.product.name,
        cart_quantity: this.total_Items,
      },
      closeButton: false,
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
