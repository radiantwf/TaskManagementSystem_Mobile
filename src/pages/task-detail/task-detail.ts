import { Component } from '@angular/core';
import { NavController, Platform, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { CommunicationsPage } from '../communications/communications';
import { Task } from '../../model/task';
import { TaskService } from '../../providers/task.service';

/*
  Generated class for the TaskDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html'
})
export class TaskDetailPage {
  taskId: string;
  task: Task;

  constructor(public navCtrl: NavController,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private actionSheetCtrl: ActionSheetController,
    private navParams: NavParams,
    private taskService: TaskService) {
    this.taskId = navParams.get('taskId').taskId;
  }

  communicate() {
    this.navCtrl.push(CommunicationsPage, { id: this.taskId });
  }
  back() {
    this.navCtrl.pop();
  }
  ionViewWillEnter() {
    this.taskService.getTask(this.taskId)
      .subscribe(task => {
        this.task = task;
      });
  }
  doRefresh(refresher) {
    this.taskService.getTask(this.taskId)
      .subscribe(task => {
        this.task = task;
        refresher.complete();
      });
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '任务操作',
      buttons: [
        {
          text: '开始',
          handler: () => {
          }
        },
        {
          text: '填写进度',
          handler: () => {
          }
        },
        {
          text: '开始',
          handler: () => {
          }
        },
        {
          text: '完成',
          handler: () => {
          }
        },
        {
          text: '关闭',
          handler: () => {
          }
        },
        {
          text: '编辑',
          handler: () => {
          }
        }, {
          text: '删除',
          role: 'destructive',
          handler: () => {
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
}
