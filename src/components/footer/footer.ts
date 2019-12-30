import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ChatServiceProvider } from '../../providers/chat-service/chat-service';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs';

@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})

/**
 * Manages all methods 
 */
export class FooterComponent {

  /**
* Value of the chatBadge
*/
  chatBadge;

   /**
* defining msgLoader
*/
  public msgLoader;

   /**
* defining pages
*/
  pages: Array<any>;

    /**
*  loads first when entering to the page 
*/
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public chatService: ChatServiceProvider
  ) {
    this.onPageLoad();
  }

    /**
*  initializing pages
*  @param pages adding title icon and component
*  @returns The pages with navigation
*/
  onPageLoad() {
    this.pages = [
      { title: 'Book Service', component: "ServiceRequestsPage", icon: "home" },
      { title: 'Chat', component: "ChatPage", icon: "chatboxes", badge: this.chatBadge },
      { title: 'Profile', component: "ProfilePage", icon: "person" },
    ];
  }

    /**
*  getting unread chat messages count
* sending request to server by interval 
*  @param msgLoader initialiing to send server request for unread chat
*  @returns unread chat data
*/
  getunreadChat() {
    this.storage.get('user_id').then((id) => {
      this.msgLoader = Observable.interval(5000).subscribe((value) => {
        let chatObj = {
          action: "unread_chat",
          id: id,
        }
        this.onPageLoad();
        // this.chatService.chatData(chatObj).subscribe((result) => {
        //   if(result){
        //     this.chatBadge = result.data.unread;
        //     console.log("unread",this.chatBadge)
        //   }

        // })
      })
    })

  }

    /**
*  navigating to selected page
*/
  gotoPage(page) {
    this.navCtrl.setRoot(page)
  }


}
