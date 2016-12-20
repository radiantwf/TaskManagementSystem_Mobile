import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, App, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { SigninPage } from '../pages/signin/signin';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = SigninPage;
  exitAlertPopFlag = false;
  @ViewChild('rootNav') nav: NavController;
  constructor(public platform: Platform,
    public app: App,
    public alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.registerBackButtonListener();
    });
  }
  registerBackButtonListener() {
    this.platform.registerBackButtonAction(() => {
      if (this.nav.canGoBack()) {
        this.nav.pop();
      }
      else {
        this.confirmExitApp();
      }
    });
  }
  confirmExitApp() {
    if (this.exitAlertPopFlag)
      return;
    this.exitAlertPopFlag = true;
    let confirmAlert = this.alertCtrl.create({
      title: '退出确认',
      message: '确定要退出本应用?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            this.exitAlertPopFlag = false;
          }
        },
        {
          text: '退出',
          handler: () => {
            this.platform.exitApp();
            this.exitAlertPopFlag = false;
          }
        }
      ],
      enableBackdropDismiss: false
    });
    confirmAlert.present();
  }
}