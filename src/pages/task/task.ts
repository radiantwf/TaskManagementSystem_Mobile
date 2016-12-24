import { Component } from '@angular/core';
import { NavController, MenuController, App, NavParams } from 'ionic-angular';
import { TaskDetailPage } from '../task-detail/task-detail';
import { CreateTaskPage } from '../create-task/create-task';
import { Task } from '../../model/task';
import { TaskService } from '../../providers/task.service';
import { UserDefinedEventsService } from '../../providers/user-defined-events.service';

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
  tasks: Array<Task> = null;
  page: number = 1;
  searchCriteria: string = '';
  searchCriteria2: string = '';
  onlyRelatedToMe: boolean = true;
  onOnlyRelatedToMeChanged: any = null;
  onTaskCreated: any = null;
  touchTaskId: string = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    public menu: MenuController,
    public taskService: TaskService,
    public events: UserDefinedEventsService) {
    menu.enable(true);
  }

  showDetail(id) {
    if (id == null) {
      return;
    }
    this.appCtrl.getRootNav().push(TaskDetailPage, { taskId: id });
    this.touchTaskId = null;
  }
  searchTask(event) {
    this.page = 1;
    this.taskService.getTasks(this.searchCriteria, this.searchCriteria2, this.page)
      .subscribe(tasks => {
        this.tasks = null;
        this.addTasks(tasks);
      });
  }
  addTasks(tasks) {
    if (this.tasks == null) {
      this.tasks = new Array<Task>();
    }
    if (tasks != null) {
      tasks.forEach(value => {
        if (this.tasks.findIndex(task => task.id === value.id) < 0) {
          this.tasks.push(value);
        }
      });
    }
  }
  createTask() {
    this.appCtrl.getRootNav().push(CreateTaskPage);
  }
  doInfinite(infiniteScroll) {
    this.touchTaskId = null;
    this.taskService.getTasks(this.searchCriteria, this.searchCriteria2, this.page + 1)
      .subscribe(tasks => {
        if (tasks != null && tasks.length > 0) {
          this.addTasks(tasks);
          this.page++;
        }
        infiniteScroll.complete();
      });
  }
  doRefresh(refresher) {
    this.touchTaskId = null;
    this.reloadTasks(refresher);
  }

  reloadTasks(elementComplete: any) {
    this.touchTaskId = null;
    this.page = 1;
    if (this.onlyRelatedToMe === true) {
      this.searchCriteria2 = 'charging';
    } else {
      this.searchCriteria2 = '';
    }
    this.taskService.getTasks(this.searchCriteria, this.searchCriteria2, this.page)
      .subscribe(tasks => {
        this.tasks = null;
        this.addTasks(tasks);
        if (elementComplete != null) {
          elementComplete.complete();
        }
      });
  }
  ionViewDidEnter() {
    this.touchTaskId = null;
  }
  ionViewDidLoad() {
    this.onOnlyRelatedToMeChanged = (eventData) => {
      this.onlyRelatedToMe = eventData[0];
      this.reloadTasks(null);
    };
    this.onTaskCreated = () => {
      this.reloadTasks(null);
    };
    this.events.relatedToMeToggleSubscribe(this.onOnlyRelatedToMeChanged);
    this.events.taskCreatedSubscribe(this.onTaskCreated);
  }
  ionViewWillUnload() {
    this.events.relatedToMeToggleUnsubscribe(this.onOnlyRelatedToMeChanged);
    this.events.taskCreatedUnsubscribe(this.onTaskCreated);
  }
}
