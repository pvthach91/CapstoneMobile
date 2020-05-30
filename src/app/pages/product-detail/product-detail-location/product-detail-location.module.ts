import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailLocationPageRoutingModule } from './product-detail-location-routing.module';

import { ProductDetailLocationPage } from './product-detail-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailLocationPageRoutingModule
  ],
  declarations: [ProductDetailLocationPage]
})
export class ProductDetailLocationPageModule {}
