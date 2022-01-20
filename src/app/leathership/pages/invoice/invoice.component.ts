import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//
import { Subscription } from 'rxjs';
//
import { Order } from '../../models/commerce';
//
import { CheckoutService } from '../../services/checkout.service';

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
    private route: ActivatedRoute,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.checkoutService.switchFN.next(false);
    this.getInvoice();
    sessionStorage.clear();
  }

  getInvoice() {
    this.sub.add(
      this.route.data.subscribe((data) => {
        this.order = data.invoice;
        this.getDate();
      })
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
