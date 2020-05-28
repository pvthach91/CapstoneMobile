import { Component, OnInit } from '@angular/core';
import {MessageChat} from "../../../model/message.model";

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.page.html',
  styleUrls: ['./chat-detail.page.scss'],
})
export class ChatDetailPage implements OnInit {
  messages:Array<MessageChat> = new Array<MessageChat>();
  // messages:Array<any> = new Array<any>();

  constructor() { }

  ngOnInit() {
    let m1 = new MessageChat('assets/images/owner.png', 'right', 'Hi test', 'Thach Pham', '2020/12/12');
    let m2 = new MessageChat('assets/images/owner.png', 'left', 'Hi test rep', 'Fatima', '2020/12/12');
    let m3 = new MessageChat('assets/images/owner.png', 'right', 'Hi test', 'Thach Pham', '2020/12/12');
    let m4 = new MessageChat('assets/images/owner.png', 'right', 'Hi test', 'Thach Pham', '2020/12/12');
    let m5 = new MessageChat('assets/images/owner.png', 'right', 'Hi test', 'Thach Pham', '2020/12/12');
    let m6 = new MessageChat('assets/images/owner.png', 'right', 'Hi test', 'Thach Pham', '2020/12/12');
    let m7 = new MessageChat('assets/images/owner.png', 'right', 'Hi test', 'Thach Pham', '2020/12/12');
    let m8 = new MessageChat('assets/images/owner.png', 'right', 'Hi test', 'Thach Pham', '2020/12/12');


    // let m1 = {'img':'assets/images/owner.png', 'position':'right', 'content':'Hi test', 'senderName':'Thach Pham', 'time':'2020/12/12'};
    // let m2 = {'img':'assets/images/owner.png', 'position':'left', 'content':'Hi test rep please sell me this product', 'senderName':'Fatima', 'time':'2020/12/12'};
    // let m3 = {'img':'assets/images/owner.png', 'position':'right', 'content':'Hi test hahaha', 'senderName':'Thach Pham', 'time':'2020/12/12'};

    this.messages.push(m1);
    this.messages.push(m2);
    this.messages.push(m3);
    this.messages.push(m4);
    this.messages.push(m5);
    this.messages.push(m6);
    this.messages.push(m7);
    this.messages.push(m8);
  }

}
