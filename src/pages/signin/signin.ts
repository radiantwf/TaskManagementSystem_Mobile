import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
    private userService: UserService,
    private global: Global) { }

  username: string;
  password: string;

  ionViewDidLoad() {
  }
  siginin() {
    let hash = sha1.hash(this.password);
    this.userService.signin(this.username, hash)
      .subscribe(user => {
        if (user != null) {
          this.global.LocalToken = user.token;
          this.navCtrl.push(TabsPage);
        } else {
          this.global.LocalToken = '';
        }
      })
  }
}
