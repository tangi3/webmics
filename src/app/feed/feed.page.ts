import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from 'shared/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage {
  logininfo: any;
  user: any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private usrService: UserService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.userinfo) {
        this.logininfo = JSON.parse(params.userinfo);
      }
    });
  }
  ionViewWillEnter() {
    this.getUserInfo();

    //Create a user based on facebookID
    if (this.usrService.userExist(this.user.id) == false) {
      this.usrService.createUser(this.user.id, this.user.name, this.user.email);
    }
  }

  async signOut(): Promise<void> {
    await Plugins.FacebookLogin.logout();
    this.router.navigate(['/home']);
  }

  async getUserInfo() {
    const response = await fetch(`https://graph.facebook.com/${this.logininfo.userId}?fields=id,name,gender,link,picture&type=large&access_token=${this.logininfo.token}`);
    const myJson = await response.json();
    this.user = myJson
  }
}
