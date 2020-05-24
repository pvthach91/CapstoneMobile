import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatDetailPageRoutingModule } from './chat-detail-routing.module';

import { ChatDetailPage } from './chat-detail.page';
import {ChatBubbleComponent} from "../chat-bubble/chat-bubble.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatDetailPageRoutingModule
  ],
  declarations: [ChatDetailPage, ChatBubbleComponent]
})
export class ChatDetailPageModule {}
