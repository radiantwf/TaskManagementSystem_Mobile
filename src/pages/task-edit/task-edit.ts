import { Component } from '@angular/core';
import { NavController, Platform, NavParams, ViewController, AlertController } from 'ionic-angular';

import { Task } from './../../model/task';
import { Employee } from './../../model/employee';
import { TaskService } from './../../providers/task.service';
import { EmployeeService } from './../../providers/employee.service';
import { Global } from '../../providers/global';
import { UserDefinedEventsService } from '../../providers/user-defined-events.service';

/*
  Generated class for the TaskEdit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-task-edit',
  templateUrl: 'task-edit.html'
})
export class TaskEditPage {
  taskId: string;
  srcTask: Task = new Task('', '');
  editingTask: Task = null;

  sellerId: string;
  OCId: string;
  taskManagerId: string;

  employees: Array<Employee>;
  sellers: Array<Employee>;
  OC: Array<Employee>;
  taskManagers: Array<Employee>;
  editted: boolean = false;

  isSeller: boolean = false;
  isOC: boolean = false;
  isTaskAdmin: boolean = false;
  isTaskManager: boolean = false;
  isAdmin: boolean = false;
  onTaskEdited: any = null;
  today: Date = new Date(Date.parse(new Date(Date.now()).toLocaleDateString()));

  editingRequiringEndDate: string;
  editingPlanningBeginDate: string;
  editingPlanningEndDate: string;
  editingRealBeginDate: string;
  editingRealEndDate: string;

  constructor(public navCtrl: NavController,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public employeeService: EmployeeService,
    public taskService: TaskService,
    public global: Global,
    public events: UserDefinedEventsService) {
  }

  ionViewDidLoad() {
    this.taskId = this.navParams.get('taskId');
    let user = this.global.CurrentUser;
    this.isAdmin = user.permissions.findIndex(value => (value === 1)) >= 0;
    this.isOC = user.permissions.findIndex(value => (value === 99)) >= 0;
    this.isSeller = user.permissions.findIndex(value => (value === 98)) >= 0;
    this.isTaskAdmin = user.permissions.findIndex(value => (value === 11 || value === 21)) >= 0;
    this.isTaskManager = user.permissions.findIndex(value => (value === 17 || value === 18 || value === 19 || value === 29)) >= 0;

    this.onTaskEdited = () => {
      this.reloadTask(null);
    };
    this.events.taskEditedSubscribe(this.taskId, this.onTaskEdited);
  }

  ionViewWillUnload() {
    this.events.taskEditedUnsubscribe(this.taskId, this.onTaskEdited);
  }

  ionViewWillEnter() {
    this.loadEmployees();
    this.reloadTask(null);
  }

  cancel() {
    this.navCtrl.pop();
  }

  editTask() {
    if (this.editingRequiringEndDate != null)
      this.editingTask.requiringEndDate = new Date(Date.parse(this.editingRequiringEndDate));
    if (this.editingPlanningBeginDate != null)
      this.editingTask.planningBeginDate = new Date(Date.parse(this.editingPlanningBeginDate));
    if (this.editingPlanningEndDate != null)
      this.editingTask.planningEndDate = new Date(Date.parse(this.editingPlanningEndDate));
    if (this.editingRealBeginDate != null)
      this.editingTask.realBeginDate = new Date(Date.parse(this.editingRealBeginDate));
    if (this.editingRealEndDate != null)
      this.editingTask.realEndDate = new Date(Date.parse(this.editingRealEndDate));

    this.taskService.update(this.editingTask)
      .subscribe(() => {
        this.navCtrl.pop();
        this.events.taskEditedPublish(this.taskId);
      });
  }

  doRefresh(refresher) {
    if (this.editted) {
      let confirmAlert = this.alertCtrl.create({
        title: '警告',
        message: '当前数据已被修改，是否放弃本次修改?',
        buttons: [
          {
            text: '取消',
            handler: () => {
              refresher.complete();
            }
          },
          {
            text: '放弃',
            handler: () => {
              this.reloadTask(refresher);
            }
          }
        ],
        enableBackdropDismiss: false
      });
      confirmAlert.present();
    } else {
      this.reloadTask(refresher);
    }
  }

  reloadTask(elementComplete: any) {
    this.taskService.getTask(this.taskId)
      .subscribe(task => {
        this.srcTask = task;
        this.editingTask = new Task(this.taskId, null);
        this.editted = false;
        this.today = new Date(Date.parse(new Date(Date.now()).toLocaleDateString()));
        if (elementComplete != null) {
          elementComplete.complete();
        }
      });
  }

  loadEmployees() {
    this.employeeService.getEmployee().subscribe(e => {
      this.employees = e;
      this.processEmployees();
    });
  }

  processEmployees() {
    this.sellers = new Array<Employee>();
    this.OC = new Array<Employee>();
    this.taskManagers = new Array<Employee>();
    this.sellerId = null;
    this.OCId = null;
    this.taskManagerId = null;
    this.employees.forEach(value => {
      if (value.permissions.findIndex(p => (p === 98)) >= 0) {
        this.sellers.push(value);
        if (value.empId === this.global.CurrentUser.empId) {
          this.sellerId = value.empId;
        }
      }
      if (value.permissions.findIndex(p => (p === 99)) >= 0) {
        this.OC.push(value);
        if (value.empId === this.global.CurrentUser.empId) {
          this.OCId = value.empId;
        }
      }
      if (value.permissions.findIndex(p => (p === 1
        || p === 11 || p === 17 || p === 18 || p === 19 || p === 21 || p === 29)) >= 0) {
        this.taskManagers.push(value);
        if (value.empId === this.global.CurrentUser.empId) {
          this.taskManagerId = value.empId;
        }
      }
    });
  }
}
