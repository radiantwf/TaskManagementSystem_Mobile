import { Component } from '@angular/core';
import { NavController, MenuController, App, NavParams } from 'ionic-angular';
import { ProjectDetailPage } from '../project-detail/project-detail';
import { Project } from '../../model/project';
import { ProjectService } from '../../providers/project.service';
import { UserDefinedEventsService } from '../../providers/user-defined-events.service';

/*
  Generated class for the Project page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-project',
  templateUrl: 'project.html'
})
export class ProjectPage {
  projects: Array<Project> = null;
  page: number = 1;
  searchCriteria: string = '';
  searchCriteria2: string = '';
  onlyRelatedToMe: boolean = true;
  onOnlyRelatedToMeChanged: any = null;
  touchProjectId: string = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    public menu: MenuController,
    public projectService: ProjectService,
    public events: UserDefinedEventsService) {
    menu.enable(true);
  }

  showDetail(id) {
    if (id == null) {
      return;
    }
    this.appCtrl.getRootNav().push(ProjectDetailPage, { projectId: id });
    this.touchProjectId = null;
  }
  searchProject(event) {
    this.page = 1;
    this.projectService.getProjects(this.searchCriteria, this.searchCriteria2, this.page)
      .subscribe(projects => {
        this.projects = null;
        this.addProjects(projects);
      });
  }
  addProjects(projects) {
    if (this.projects == null) {
      this.projects = new Array<Project>();
    }
    if (projects != null) {
      projects.forEach(value => {
        if (this.projects.findIndex(project => project.id === value.id) < 0) {
          this.projects.push(value);
        }
      });
    }
  }
  doInfinite(infiniteScroll) {
    this.touchProjectId = null;
    this.projectService.getProjects(this.searchCriteria, this.searchCriteria2, this.page + 1)
      .subscribe(projects => {
        if (projects != null && projects.length > 0) {
          this.addProjects(projects);
          this.page++;
        }
        infiniteScroll.complete();
      });
  }
  doRefresh(refresher) {
    this.touchProjectId = null;
    this.reloadProjects(refresher);
  }

  reloadProjects(elementComplete: any) {
    this.touchProjectId = null;
    this.page = 1;
    if (this.onlyRelatedToMe === true) {
      this.searchCriteria2 = 'charging';
    } else {
      this.searchCriteria2 = '';
    }
    this.projectService.getProjects(this.searchCriteria, this.searchCriteria2, this.page)
      .subscribe(projects => {
        this.projects = null;
        this.addProjects(projects);
        if (elementComplete != null) {
          elementComplete.complete();
        }
      });
  }
  ionViewDidEnter() {
    this.touchProjectId = null;
    this.reloadProjects(null);
  }
  ionViewDidLoad() {
    this.onOnlyRelatedToMeChanged = (eventData) => {
      this.onlyRelatedToMe = eventData[0];
      this.reloadProjects(null);
    };
    this.events.relatedToMeToggleSubscribe(this.onOnlyRelatedToMeChanged);
  }
  ionViewWillUnload() {
    this.events.relatedToMeToggleUnsubscribe(this.onOnlyRelatedToMeChanged);
  }
}
