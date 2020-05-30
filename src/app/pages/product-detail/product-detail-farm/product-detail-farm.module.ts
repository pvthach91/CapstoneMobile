import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailFarmPageRoutingModule } from './product-detail-farm-routing.module';

import { ProductDetailFarmPage } from './product-detail-farm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailFarmPageRoutingModule
  ],
  declarations: [ProductDetailFarmPage]
})
export class ProductDetailFarmPageModule {}
