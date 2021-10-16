import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('searchForm') searchForm!: ElementRef;
  @ViewChild('menuBtn') menuBtn!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.windowToggler();
  }

  togglerSearch() {
    this.searchForm.nativeElement.classList.toggle('active');
  }

  togglerMenu() {
    this.menuBtn.nativeElement.classList.toggle('active');
  }

  windowToggler() {
    window.onscroll = () => {
      this.searchForm.nativeElement.classList.remove('active');
      this.menuBtn.nativeElement.classList.remove('active');
    };
  }
}
