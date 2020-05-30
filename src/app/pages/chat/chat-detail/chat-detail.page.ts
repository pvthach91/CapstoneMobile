import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageChat} from "../../../model/message.model";
import {ChatService} from "../../../services/chat.service";
import {ActivatedRoute} from "@angular/router";
import {configuration} from "../../../model/configuration.model";
import {AlertController, IonContent} from "@ionic/angular";
import {Chat} from "../../../model/chat.model";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {ChatRequest} from "../../../model/post/chat-request.model";

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.page.html',
  styleUrls: ['./chat-detail.page.scss'],
})
export class ChatDetailPage implements OnInit {
  // @ViewChild('content', null) private content: IonContent;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  id;
  messages:Array<MessageChat> = new Array<MessageChat>();
  // messages:Array<any> = new Array<any>();
  myMessage ='';

  constructor(private chatService: ChatService,
              private route: ActivatedRoute,
              private tokenStorage: TokenStorageService,
              public alertController: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == null || this.id == undefined) {
        // Load new page
      } else {
        // Load detail page
        this.getChats();
      }
    });
    // let m1 = new MessageChat('assets/images/owner.png', 'right', 'Hi test', 'Thach Pham', '2020/12/12');
    // let m2 = new MessageChat('assets/images/owner.png', 'left', 'Hi test rep', 'Fatima', '2020/12/12');
    // let m3 = new MessageChat('assets/images/owner.png', 'right', 'Hi test', 'Thach Pham', '2020/12/12');
    // let m4 = new MessageChat('assets/images/owner.png', 'right', 'Hi test', 'Thach Pham', '2020/12/12');
    // let m5 = new MessageChat('assets/images/owner.png', 'right', 'Hi test', 'Thach Pham', '2020/12/12');
    // let m6 = new MessageChat('assets/images/owner.png', 'right', 'Hi test', 'Thach Pham', '2020/12/12');
    // let m7 = new MessageChat('assets/images/owner.png', 'right', 'Hi test', 'Thach Pham', '2020/12/12');
    // let m8 = new MessageChat('assets/images/owner.png', 'right', 'Hi test', 'Thach Pham', '2020/12/12');


    // let m1 = {'img':'assets/images/owner.png', 'position':'right', 'content':'Hi test', 'senderName':'Thach Pham', 'time':'2020/12/12'};
    // let m2 = {'img':'assets/images/owner.png', 'position':'left', 'content':'Hi test rep please sell me this product', 'senderName':'Fatima', 'time':'2020/12/12'};
    // let m3 = {'img':'assets/images/owner.png', 'position':'right', 'content':'Hi test hahaha', 'senderName':'Thach Pham', 'time':'2020/12/12'};

    // this.messages.push(m1);
    // this.messages.push(m2);
    // this.messages.push(m3);
    // this.messages.push(m4);
    // this.messages.push(m5);
    // this.messages.push(m6);
    // this.messages.push(m7);
    // this.messages.push(m8);
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  getChats() {
    this.chatService.getChats(this.id).subscribe(
      data => {
        if (data != null) {
          let chats = data;
          this.convertToMessage(chats);
          // this.content.scrollToBottom();
          // this.content.scrollToBottom(1500);
          var objDiv = document.getElementById("main-content");
          objDiv.scrollTop = objDiv.scrollHeight;
          console.log('haga');
        } else {
          this.presentAlert('Error', '', 'Failed to gt message');
        }
      },
      error => {
        console.log(error);
        this.presentAlert('Error', '', error.toString());
      }
    );
  }

  convertToMessage(chats: Array<Chat>) {
    this.messages = new Array<MessageChat>();
    chats.forEach((chat, index) => {
      let img = '';
      let position;
      let content = chat.content;
      let sender = chat.fromUser.name;
      let time = chat.dateCreated;
      if (chat.fromUser.username == this.tokenStorage.getUsername()) {
        if (chat.fromUser.photo == null || chat.fromUser.photo.length ==0){
          img = 'assets/images/no_image_available.png';
        } else {
          img = configuration.host + '/api/guest/file/' + chat.fromUser.photo;
        }
        position = 'right';
      } else {
        if (chat.toUser.photo == null || chat.toUser.photo.length ==0){
          img = 'assets/images/no_image_available.png';
        } else {
          img = configuration.host + '/api/guest/file/' + chat.toUser.photo;
        }
        position = 'left';
      }
      let message = new MessageChat(img, position, content, sender, time);
      this.messages.push(message);
    });
  }

  addNewMessage() {
    let c: ChatRequest = new ChatRequest(this.myMessage, this.id);
    // let c = new Comment(null,'test', null, null);
    this.chatService.addChat(c).subscribe(
      data => {
        if (data != null) {
          this.myMessage = '';
          this.getChats();
        } else {
          this.presentAlert('Error', '', 'Failed to gt message');
        }
      },
      error => {
        console.log(error);
        this.presentAlert('Error', '', JSON.stringify(error));
      }
    );
  }

}
