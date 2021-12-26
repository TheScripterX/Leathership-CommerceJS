import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//
import { CheckoutService } from '../../services/checkout.service';
//
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Order } from '../../models/commerce';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit, OnDestroy {
  order!: Order;
  date!: Date;

  // RxJS
  sub: Subscription = new Subscription();

  constructor(
    private checkoutService: CheckoutService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getInvoice();
  }

  getInvoice() {
    this.sub.add(
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => {
            return this.checkoutService.initInvoice(id);
          })
        )
        .subscribe(
          (invoice) => {
            console.log(invoice);
            this.order = invoice;
            this.getDate();
          },

          (err) => console.warn('Error in initInvoice : ', err),

          () => {
            console.info('Finish !!!');
          }
        )
    );
  }

  getDate() {
    const timestamp = this.order.created;
    const date = new Date(timestamp * 1000); // Unix Timestamp method

    this.date = date;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
