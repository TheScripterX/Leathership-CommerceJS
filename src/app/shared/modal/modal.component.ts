import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
//
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit {
  constructor(public ref: DialogRef, private router: Router) {}

  ngOnInit(): void {}

  close() {
    this.ref.close();
  }

  returnToHome() {
    this.router.navigateByUrl('/');
    this.ref.close();
  }

  goToCart() {
    this.router.navigateByUrl('/cart');
    this.ref.close();
  }

  backdropClick() {
    this.ref.close();
  }
}
