import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//
import { LeathershipModule } from './leathership/leathership.module';
import { SharedModule } from './shared/shared.module';
// TS Libraries

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, LeathershipModule],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
