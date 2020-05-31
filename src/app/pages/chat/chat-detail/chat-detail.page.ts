import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageChat} from "../../../model/message.model";
import {ChatService} from "../../../services/chat.service";
import {ActivatedRoute} from "@angular/router";
import {configuration} from "../../../model/configuration.model";
import {AlertController, IonContent} from "@ionic/angular";
import {Chat} from "../../../model/chat.model";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {ChatRequest} from "../../../model/post/chat-request.model";
import {interval} from "rxjs";

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

        interval(5000).subscribe(x => {
          this.getChats();
        });
      }
    });
  }

  ionViewDidEnter() {
    this.content.scrollToBottom();
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
    let chatDetail = this;
    this.chatService.getChats(this.id).subscribe(
      data => {
        if (data != null) {
          let chats = data;
          this.convertToMessage(chats);
          // this.content.scrollToBottom();
          // this.content.scrollToBottom(1500);
          // var objDiv = document.getElementById("main-content");
          // objDiv.scrollTop = objDiv.scrollHeight;
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
        sender = 'You';
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
