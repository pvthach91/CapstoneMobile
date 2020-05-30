import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailRatePageRoutingModule } from './product-detail-rate-routing.module';

import { ProductDetailRatePage } from './product-detail-rate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailRatePageRoutingModule
  ],
  declarations: [ProductDetailRatePage]
})
export class ProductDetailRatePageModule {}
