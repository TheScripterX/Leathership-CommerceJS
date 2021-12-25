import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
//
import { switchMap } from 'rxjs/operators';
//
import { CheckoutService } from '../../services/checkout.service';
import {
  Checkout,
  LineItem,
  VariantData,
  LineItemsData,
} from '../../models/commerce';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkout!: Checkout;
  lineItems!: LineItem[];
  //
  checkoutForm!: FormGroup;
  //
  captureObject: LineItemsData[] = [];
  lineItems_ID: string[] = [];
  variantItems_ID: string[] = [];

  constructor(
    private checkoutService: CheckoutService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCheckout();
    this.initCheckoutForm();
  }

  getCheckout() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.checkoutService.initCheckout(id);
        })
      )
      .subscribe(
        (checkout) => {
          console.log('Checkout : ', checkout);
          this.checkout = checkout;
          this.lineItems = checkout.live.line_items;
          // Test
          this.getLineItems();
        },

        (err) => {
          console.log('Error in Checkout Component : ', err);
        },
        () => {
          console.log('Checkout Done!');
        }
      );
  }

  getLineItems() {
    // if (this.lineItems) {
    //   this.lineItems.forEach((element, index, elements) => {
    //     console.log('MD : ', elements[index].id);
    //     // this.lineItems_ID = elements[index].id;
    //     this.captureObject = {
    //       line_items: {
    //         [elements[index].id]: {
    //           variant_id :
    //  }
    //       },
    //     };
    //   });
    // } else {
    //   console.warn('lineItems Empty!!!');
    // }

    this.lineItems.forEach((item) => {
      // this.lineItems_ID.push(item.id);
      // this.variantItems_ID.push(item.variant.id);
      this.captureObject.push({
        [item.id]: {
          variant_id: item.variant.id,
          quantity: item.quantity,
        },
      });

      //
      //
      //
    });

    // // Test 1
    // console.log('Test 1 : ', this.lineItems_ID);
    // // Test 2
    // console.log('Test 2 : ', this.variantItems_ID);

    console.log('Final : ', this.captureObject);
  }

  initCheckoutForm() {
    this.checkoutForm = this.fb.group({
      line_items: this.fb.array([[this.captureObject]]),

      customer: this.fb.group({
        firstname: [''],
        lastname: [''],
        email: [''],
        phone: [''],
      }),
      shipping: this.fb.group({
        name: [''], // Full name customer
        street: [''], // Rue
        town_city: [''], // Ville
        postal_zip_code: [''],
        country: [''],
        county_state: [''],
      }),

      payment: this.fb.group({
        gateway: ['test_gateway'],
        card: this.fb.group({
          number: ['4242424242424242'],
          expiry_month: ['02'],
          expiry_year: ['24'],
          cvc: ['123'],
          postal_zip_code: ['94107'],
        }),
      }),
    });
  }

  getData() {
    const { customer, shipping, payment } = this.checkoutForm.value;
    console.warn('PUSH : ', customer, shipping, this.captureObject);
    this.checkoutService
      .captureOrder(
        this.checkout.id,
        this.captureObject,
        customer,
        shipping,
        payment
      )
      .subscribe(
        (data) => {
          console.log('Success : ', data);
        },

        (err) => {
          console.warn('Error in Push method : ', err);
        },

        () => {
          console.info('Bravoo !!!');
        }
      );
  }
}
