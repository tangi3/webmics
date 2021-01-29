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
      else { this.router.navigate(["/home"]); }
    });
  }

  ionViewWillEnter() { this.getUserInfo(); }

  async signOut(): Promise<void> {
    await Plugins.FacebookLogin.logout();
    this.router.navigate(['/home']);
  }

  async getUserInfo() {
    const response = await fetch(`https://graph.facebook.com/${this.logininfo.userId}?fields=id,name,gender,link,picture&type=large&access_token=${this.logininfo.token}`);
    const myJson = await response.json();
    this.user = myJson
    this.usrService.createFacebookUser(this.user);
  }
}
