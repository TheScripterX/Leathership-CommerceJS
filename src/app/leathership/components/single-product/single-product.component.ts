import {
  AfterContentChecked,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
//
import { ProductService } from '../../services/product.service';
import {
  Product,
  Asset,
  Option,
  VariantGroup,
  VariantData,
} from '../../models/commerce';

// SwiperJS::Start
import SwiperCore, { Navigation, Thumbs } from 'swiper';
import { Variants, Cart, RootCart, LineItem } from '../../models/commerce';
import { CartService } from '../../pages/cart/cart.service';
SwiperCore.use([Navigation, Thumbs]);
// SwiperJS::End

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SingleProductComponent implements OnInit, AfterContentChecked {
  thumbsSwiper: any;
  //
  product!: Product;
  assets!: Asset[];
  variantOptions!: Option[];
  variant_Group!: VariantGroup[];

  // Product Part
  productForm!: FormGroup;
  product_ID: string = 'No Value';
  product_Price: string = "Choisissez votre modèle d'iPhone";
  variant_Group_ID: string = 'No Value';
  variant_Option_ID: string = 'No Value';
  variant_Data!: VariantData;

  // Cart Part
  total_Items!: number;
  cart_Items!: LineItem[];

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

  ngAfterContentChecked(): void {}

  productId() {
    this.activeRoute.params.subscribe(({ id }) => {
      // console.log(id);
      this.productService.getProduct(id).subscribe((product: Product) => {
        this.product = product;
        this.product_ID = product.id; // --> For binding with Product_Variant_Group
        this.variant_Group = product.variant_groups;
        this.assets = product.assets;
        // console.log('Product Info : ', this.product);
        // console.log('Product ID : ', this.product_ID);
        // console.log('Variant Group ID : ', this.variant_Group_ID);
        // console.log('Specific Variant ID : ', this.variant_ID);
      });
    });
  }

  initProductForm() {
    this.productForm = this.fb.group({
      variant_Group_ID: 'Pour',
      variant_Options_ID: '-- Modèle de Téléphone --',
      quantity: '1',
    });
  }

  onVariantGroupChange(changes: any) {
    this.variant_Group_ID = changes.value;
    // console.log('Variant Group : ', this.variant_Group_ID, this.product_ID);
    this.productService
      .getVariantGroupsOptions(this.product_ID, this.variant_Group_ID)
      .subscribe((data: VariantGroup) => {
        this.variantOptions = data.options;
        // console.log('Variant Options : ', this.variantOptions);
      });
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

  commander() {
    // this.cartService.generateCart().subscribe(({ id: cart_ID }: Cart) => {
    //   this.cartService
    //     .addToCart(cart_ID, this.product_ID, quantity, this.variant_Data)
    //     .subscribe((cart: RootCart) => {
    //       console.log(cart.cart);
    //       console.log(cart.cart.line_items);
    //       this.cartService.cart_Items.push(cart.cart.line_items);
    //       // console.log(cart.cart.line_items[0].product_id)
    //     });
    // });
  }

  addToCart() {
    const { quantity } = this.productForm.value;
    const sessionCart = sessionStorage.getItem('cart_Session');

    // Get Cart ID from SessionStorage
    this.cartService
      .retrieveCart(sessionCart!)
      .subscribe(({ id: cart_ID }: Cart) => {
        console.log('ID Cart : ', cart_ID);
        console.log('Cart Already init');

        // Add to cart method
        this.cartService
          .addToCart(cart_ID, this.product_ID, quantity, this.variant_Data)
          .subscribe(
            () => {
              // Get current cart items to send Total items to Header
              this.cartService.retrieveCart(cart_ID).subscribe((items) => {
                this.cart_Items = items.line_items;
                this.total_Items = items.total_unique_items;
                this.cartService._totalItems$.next(this.total_Items);
              });
              // Modal Success TODO !!
            },

            (err) => {
              console.log('Error in Request !!!', err);
            },

            () => {
              console.log('Add to Cart Finish.');
            }
          );
      });
  }
}
