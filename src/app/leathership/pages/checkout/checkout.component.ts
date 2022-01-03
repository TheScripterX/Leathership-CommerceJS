import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
//
import { Subscription } from 'rxjs';
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
export class CheckoutComponent implements OnInit, OnDestroy {
  // Spinner Part
  loading: boolean = false;

  checkout!: Checkout;
  lineItems!: LineItem[];
  //
  checkoutForm!: FormGroup;
  //
  captureObject: LineItemsData[] = [];
  // RxJS
  sub: Subscription = new Subscription();

  constructor(
    private checkoutService: CheckoutService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCheckout();
    this.initCheckoutForm();
  }

  getCheckout() {
    this.sub.add(
      this.route.data.subscribe(
        (data) => {
          this.checkout = data.checkout;
        },

        (err) => {
          console.warn('Error on Checkout Resolve :', err);
        },

        () => {
          console.info('Checkout Resolve Success');
        }
      )
    );
  }

  getLineItems() {
    this.lineItems.forEach((item) => {
      this.captureObject.push({
        [item.id]: {
          variant_id: item.variant.id,
          quantity: item.quantity,
        },
      });
    });

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
        street_2: [''],
        town_city: [''], // Ville
        postal_zip_code: [''],
        country: ['MA'],
        county_state: [''],
      }),

      payment: this.fb.group({
        gateway: ['test_gateway'], // Test Payment Gateway
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

  generateOrder() {
    this.loading = true;
    const { customer, shipping, payment } = this.checkoutForm.value;
    // console.warn('PUSH : ', customer, shipping, this.captureObject);
    this.sub.add(
      this.checkoutService
        .captureOrder(
          this.checkout.id,
          this.captureObject,
          customer,
          shipping,
          payment
        )
        .subscribe(
          (order) => {
            console.log('Success : ', order);
            this.router.navigate(['invoice', order.id]);
          },

          (err) => {
            console.warn('Error in Push method : ', err);
          },

          () => {
            console.info('Bravoo !!!');
            this.loading = false;
          }
        )
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
