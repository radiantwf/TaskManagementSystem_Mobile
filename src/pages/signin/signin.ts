import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NavController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Global } from '../../providers/global';
import { UserService } from '../../providers/user.service';
import { sha1 } from '../../module/sha1';

/*
  Generated class for the Signin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  username: string = '';
  password: string = '';
  hiddenFlag: boolean = true;

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private userService: UserService,
    private storage: Storage,
    private global: Global) { }

  ionViewDidLoad() {
    this.hiddenFlag = true;
    let user, pwd: string;
    this.storage.get('username').then(value => {
      user = value;
      this.storage.get('pwd').then(value => {
        pwd = value;
        this.userService.signin(user, pwd)
          .subscribe(ret => {
            if (ret) {
              this.navCtrl.setRoot(TabsPage);
            }
            this.hiddenFlag = false;
          });
      });
    });
  }

  siginin() {
    let hash = sha1.hash(this.password);
    this.userService.signin(this.username, hash)
      .subscribe(ret => {
        if (ret) {
          let confirmAlert = this.alertCtrl.create({
            title: '用户',
            message: '请问是否记住当前用户?',
            buttons: [
              {
                text: '不记住',
                handler: () => {
                }
              },
              {
                text: '记住',
                handler: () => {
                  this.storage.set('username', this.username);
                  this.storage.set('pwd', hash);
                }
              }
            ]
          });
          confirmAlert.present();
          this.navCtrl.setRoot(TabsPage);
        } else {
          this.showSigninErrorAlert();
        }
      });
  }

  showSigninErrorAlert() {
    let alert = this.alertCtrl.create({
      title: '登录失败',
      subTitle: '用户名密码输入有误，请重新输入。',
      buttons: ['确定']
    });
    alert.present();
  }
}
