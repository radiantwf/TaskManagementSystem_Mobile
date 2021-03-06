import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { Task } from './../../model/task';
import { Project } from './../../model/project';
import { Product } from './../../model/product';
import { Employee } from './../../model/employee';
import { TaskService } from './../../providers/task.service';
import { ProjectService } from './../../providers/project.service';
import { ProductService } from './../../providers/product.service';
import { EmployeeService } from './../../providers/employee.service';

import { Global } from '../../providers/global';
import { UserDefinedEventsService } from '../../providers/user-defined-events.service';

/*
  Generated class for the CreateTask page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-task',
  templateUrl: 'create-task.html'
})
export class CreateTaskPage {
  newTask: Task = new Task('', '');
  employees: Array<Employee>;
  sellers: Array<Employee>;
  OC: Array<Employee>;
  taskManagers: Array<Employee>;
  projects: Array<Project>;
  products: Array<Product>;

  newRequiringEndDate: string;
  newPlanningBeginDate: string;
  newPlanningEndDate: string;

  sellerId: string;
  OCId: string;
  taskManagerId: string;

  isSeller: boolean = false;
  isOC: boolean = false;
  isTaskAdmin: boolean = false;
  isTaskManager: boolean = false;

  constructor(private navCtrl: NavController,
    private alertCtrl: AlertController,
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private global: Global,
    private events: UserDefinedEventsService,
    private projectService: ProjectService,
    private productService: ProductService) {

  }

  cancel() {
    this.navCtrl.pop();
  }

  addTask() {
    this.newTask.creatorId = this.global.CurrentUser.empId;
    this.newTask.primarySellerId = this.sellerId;
    this.newTask.primaryOCId = this.OCId;
    this.newTask.primaryExecutorId = this.taskManagerId;

    if (this.newRequiringEndDate != null)
      this.newTask.requiringEndDate = new Date(Date.parse(this.newRequiringEndDate));
    if (this.newPlanningBeginDate != null)
      this.newTask.planningBeginDate = new Date(Date.parse(this.newPlanningBeginDate));
    if (this.newPlanningEndDate != null)
      this.newTask.planningEndDate = new Date(Date.parse(this.newPlanningEndDate));

    this.taskService.create(this.newTask).subscribe(() => {
      let alert = this.alertCtrl.create({
        title: '新建任务',
        subTitle: '成功新建一条任务!',
        buttons: [
          {
            text: '确定',
            handler: data => {
              this.navCtrl.pop();
              this.events.taskCreatedPublish();
            }
          }]
      });
      alert.present();
    });
  }

  ionViewWillEnter() {
    let user = this.global.CurrentUser;
    if (user != null) {
      this.isOC = user.permissions.findIndex(value => (value === 99)) >= 0;
      this.isSeller = user.permissions.findIndex(value => (value === 98)) >= 0;
      this.isTaskAdmin = user.permissions.findIndex(value => (value === 11 || value === 21)) >= 0;
      this.isTaskManager = user.permissions.findIndex(value => (value === 17 || value === 18 || value === 19 || value === 29)) >= 0;
    }

    this.loadEmployees();
    this.projectService.getAllProjects().subscribe(p => this.projects = p);
    this.productService.getAllProducts().subscribe(p => this.products = p);
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
