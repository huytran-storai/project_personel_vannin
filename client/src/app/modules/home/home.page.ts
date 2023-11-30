import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public user: any;
  public currentStore: any;

  constructor(
    private userService: UserService,
    private storeService: StoreService,
  ) {}

  ngOnInit() {
    this.getUserData();
    this.getCurrentStore();
    (function (d, m) {
      var kommunicateSettings = {
        appId: "11c15e214c77a3f11028cdce28abe430b",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
        automaticChatOpen: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      (window as any).kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, (window as any).kommunicate || {});
  }

  getUserData() {
     this.userService.getUserData().subscribe(res=> this.user = res?.user);
  }

  getCurrentStore() {
    this.storeService.getCurrentStoreAddress().subscribe(
      (res: any) => {
        this.currentStore = res?.data[0]?.attributes;
        console.log("find store", this.currentStore)
      },
      (err) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }

}
