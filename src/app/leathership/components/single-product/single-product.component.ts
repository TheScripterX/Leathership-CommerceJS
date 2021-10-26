import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
//
import { CommercejsService } from '../../services/commercejs.service';
import {
  Product,
  Asset,
  Option,
  RootVariantGroup,
  VariantGroup,
  VariantData,
} from '../../models/commerce';

// SwiperJS::Start
import SwiperCore, { Navigation, Thumbs } from 'swiper';
import { Variants, Cart, RootCart } from '../../models/commerce';
SwiperCore.use([Navigation, Thumbs]);
// SwiperJS::End

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SingleProductComponent implements OnInit {
  thumbsSwiper: any;
  //
  product!: Product;
  assets!: Asset[];
  variantOptions!: Option[];
  variants!: Variants[];
  variant_Group!: VariantGroup[];
  //
  productForm!: FormGroup;
  //
  product_ID: string = 'No Value';
  product_Price: string = "Choisissez votre modèle d'iPhone";
  variant_Group_ID: string = 'No Value';
  variant_Option_ID: string = 'No Value';
  variant_Data!: VariantData;

  constructor(
    private activeRoute: ActivatedRoute,
    private commerce: CommercejsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productId();
    this.initProductForm();
  }

  productId() {
    this.activeRoute.params.subscribe(({ id }) => {
      // console.log(id);
      this.commerce.getProduct(id).subscribe((product: Product) => {
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
    this.commerce
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
    const { quantity } = this.productForm.value;
    this.commerce.generateCart().subscribe(({ id: cart_ID }: Cart) => {
      console.log('Cart ID : ', cart_ID);
      this.commerce
        .addToCart(cart_ID, this.product_ID, quantity, this.variant_Data)
        .subscribe((cart: RootCart) => {
          console.log(cart);
          // TODO
        });
    });
  }
}
