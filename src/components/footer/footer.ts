import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ChatServiceProvider } from '../../providers/chat-service/chat-service';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs';
  import { BehaviorSubject } from 'rxjs';

  import { BehaviourProvider } from "../../providers/behaviour/behaviour";
import { of } from 'rxjs/observable/of';
@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})

/**
 * Manages all methods 
 */
export class FooterComponent {
  selectItem: BehaviorSubject<string>;

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
    public chatService: ChatServiceProvider,
    public beh:BehaviourProvider
  ) {
    this.onPageLoad();
  }

    /**
*  initializing pages
*  @param pages adding title icon and component
*  @returns The pages with navigation
*/
  onPageLoad() {
  this.selectItem = this.beh.getfooterSelectItem();
    
    this.pages = [
      { id:1,title: 'Book Service', component: "ServiceRequestsPage", icon: "home",color:"cement" },
      { id:2,title: 'NotificationsPage', component: "NotificationsPage", icon: "ios-apps", badge: this.chatBadge ,color:"cement"},

      { id:2,title: 'Chat', component: "ChatPage", icon: "ios-bookmark", badge: this.chatBadge ,color:"cement"},
      { id:3,title: 'Profile', component: "ProfilePage", icon: "person" ,color:"cement"},
      //
    ];
    
    var item = this.pages.find(x => x.component == this.selectItem);
if (item) {
  item.color = "custom";
}

    
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
    
    this.beh.updateFooterItem(page.component);
    this.navCtrl.setRoot(page.component)
  }


}
