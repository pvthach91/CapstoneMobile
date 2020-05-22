import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmViewPageRoutingModule } from './farm-view-routing.module';

import { FarmViewPage } from './farm-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmViewPageRoutingModule
  ],
  declarations: [FarmViewPage]
})
export class FarmViewPageModule {}
