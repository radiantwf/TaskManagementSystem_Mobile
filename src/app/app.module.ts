import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { CommunicationsPage } from '../pages/communications/communications';
import { TaskPage } from '../pages/task/task';
import { ProjectPage } from '../pages/project/project';
import { ProductPage } from '../pages/product/product';
import { TaskDetailPage } from '../pages/task-detail/task-detail';
import { TaskEditPage } from '../pages/task-edit/task-edit';
import { TaskAssignModal } from '../pages/task-assign-modal/task-assign-modal';
import { ProjectDetailPage } from '../pages/project-detail/project-detail';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { CreateTaskPage } from '../pages/create-task/create-task';
import { AtMePage } from '../pages/at-me/at-me';
import { TaskStatusDirective } from '../components/task-status/task-status';
import { ProjectStatusDirective } from '../components/project-status/project-status';
import { ProductStatusDirective } from '../components/product-status/product-status';
import { Global } from '../providers/global';
import { IonicStorageModule } from '@ionic/storage';
import { UserService } from '../providers/user.service';
import { EmployeeService } from '../providers/employee.service';
import { TaskService } from '../providers/task.service';
import { ProjectService } from '../providers/project.service';
import { ProductService } from '../providers/product.service';
import { CommunicationsService } from '../providers/communications.service';
import { UserDefinedEventsService } from '../providers/user-defined-events.service';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    TaskPage,
    TaskDetailPage,
    TaskEditPage,
    TaskAssignModal,
    CreateTaskPage,
    ProjectPage,
    ProjectDetailPage,
    ProductPage,
    ProductDetailPage,
    TabsPage,
    SigninPage,
    CommunicationsPage,
    AtMePage,
    TaskStatusDirective,
    ProjectStatusDirective,
    ProductStatusDirective,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TaskPage,
    TaskDetailPage,
    TaskEditPage,
    TaskAssignModal,
    CreateTaskPage,
    ProjectPage,
    ProjectDetailPage,
    ProductPage,
    ProductDetailPage,
    TabsPage,
    SigninPage,
    CommunicationsPage,
    AtMePage,
  ],
  providers: [
    Global,
    UserService,
    EmployeeService,
    TaskService,
    ProjectService,
    ProductService,
    CommunicationsService,
    UserDefinedEventsService,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
