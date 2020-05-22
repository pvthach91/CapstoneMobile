import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliverAddressNewPageRoutingModule } from './deliver-address-new-routing.module';

import { DeliverAddressNewPage } from './deliver-address-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliverAddressNewPageRoutingModule
  ],
  declarations: [DeliverAddressNewPage]
})
export class DeliverAddressNewPageModule {}
