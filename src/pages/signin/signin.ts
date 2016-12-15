import { Component } from '@angular/core';
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

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private userService: UserService,
    private global: Global) { }

  username: string = 'testoc';
  password: string = 'test';

  ionViewDidEnter() {
  }

  siginin() {
    let hash = sha1.hash(this.password);
    this.userService.signin(this.username, hash)
      .subscribe(ret => {
        if (ret) {
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
