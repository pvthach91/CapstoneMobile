import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmNewPageRoutingModule } from './farm-new-routing.module';

import { FarmNewPage } from './farm-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmNewPageRoutingModule
  ],
  declarations: [FarmNewPage]
})
export class FarmNewPageModule {}
