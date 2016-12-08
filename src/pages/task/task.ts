import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { TaskDetailPage } from '../task-detail/task-detail';
import { CreateTaskPage } from '../create-task/create-task';

/*
  Generated class for the Task page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-task',
  templateUrl: 'task.html'
})
export class TaskPage {

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController) { }

  openModal(characterNum) {
    let modal = this.modalCtrl.create(TaskDetailPage, characterNum);
    modal.present();
  }
  getItems(event) {

  }
  addTask() {
    this.navCtrl.push(CreateTaskPage);
  }
  ionViewDidLoad() {
    console.log('Hello TaskPage Page');
  }

}
