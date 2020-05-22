import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliverAddressPageRoutingModule } from './deliver-address-routing.module';

import { DeliverAddressPage } from './deliver-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliverAddressPageRoutingModule
  ],
  declarations: [DeliverAddressPage]
})
export class DeliverAddressPageModule {}
