import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, LoadingController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              private alertCtrl:AlertController,
              private loadingCtrl:LoadingController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('platfrom ready');

      window.addEventListener('appUpdate', (e:any) => {
        let alert = this.alertCtrl.create({
          title: 'Actualización',
          message: 'Actualizar ahora a app?',
          enableBackdropDismiss: false,
          buttons: [
            'Cancelar',
            {
              text: 'Actualizar',
              handler: () => {
                let loading = this.loadingCtrl.create({
                  spinner: 'hide',
                  content: `
                    <div class="custom-spinner-container">
                      <div class="custom-spinner-box"></div>
                    </div>`,
                  duration: 1500
                });
              
                loading.onDidDismiss(() => {
                  e.detail.postMessage({ updateSw: true });
                });
                loading.present();
              }
            }
          ]
        });
        alert.present();
      }, false);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
