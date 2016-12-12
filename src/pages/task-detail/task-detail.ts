import { Component } from '@angular/core';
import { NavController, Platform, NavParams, ViewController, PopoverController } from 'ionic-angular';
import { CommunicationsPage } from '../communications/communications';
import { TaskDetailPopoverPage } from '../task-detail-popover/task-detail-popover';
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
    private popoverCtrl: PopoverController,
    private navParams: NavParams,
    private taskService: TaskService) {
    this.taskId = navParams.get('taskId').taskId;
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(TaskDetailPopoverPage, {
    });

    popover.present({
      ev: ev
    });
  }
  communicate() {
    this.navCtrl.push(CommunicationsPage, { taskId: this.taskId });
  }
  back() {
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    this.taskService.getTask(this.taskId)
      .subscribe(task => {
        this.task = task;
        console.log(this.task);
      });
  }

}
