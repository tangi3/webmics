import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appMenu = [
    {title : 'Accueil', url: '/feed', icon: 'home'},
    {title : 'Profile', url: '/profil', icon: 'person'},
    {title : 'Lire', url: '/read', icon: 'search'},
    {title : 'Publier', url: '/publish', icon: 'create'},
    {title : 'Ma bibliothèque', url: '/mylibrary', icon: 'book'},
    {title : 'Mes oeuvres', url: '/myworks', icon: 'book'},
    {title : 'Mon abonnement', url: '/mysubscriptions', icon: 'cash'}
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
