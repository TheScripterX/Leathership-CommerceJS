import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//
import { LeathershipModule } from './leathership/leathership.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
// TS Libraries

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    LeathershipModule,
    RouterModule,
    HttpClientModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
