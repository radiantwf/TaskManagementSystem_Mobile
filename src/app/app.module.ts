import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { CommunicationsPage } from '../pages/communications/communications';
import { TaskPage } from '../pages/task/task';
import { ProjectPage } from '../pages/project/project';
import { ProductPage } from '../pages/product/product';
import { TaskDetailPage } from '../pages/task-detail/task-detail';
import { TaskDetailPopoverPage } from '../pages/task-detail-popover/task-detail-popover';
import { ProjectDetailPage } from '../pages/project-detail/project-detail';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { CreateTaskPage } from '../pages/create-task/create-task';
import { Global } from '../providers/global';
import { UserService } from '../providers/user.service';

@NgModule({
  declarations: [
    MyApp,
    TaskPage,
    TaskDetailPage,
    CreateTaskPage,
    ProjectPage,
    ProjectDetailPage,
    ProductPage,
    ProductDetailPage,
    TabsPage,
    SigninPage,
    CommunicationsPage,
    TaskDetailPopoverPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TaskPage,
    TaskDetailPage,
    CreateTaskPage,
    ProjectPage,
    ProjectDetailPage,
    ProductPage,
    ProductDetailPage,
    TabsPage,
    SigninPage,
    CommunicationsPage,
    TaskDetailPopoverPage,
  ],
  providers: [Global,
    UserService,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }]
})
export class AppModule { }
