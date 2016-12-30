import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommunicationsPage } from '../communications/communications';
import { Project } from '../../model/project';
import { ProjectService } from '../../providers/project.service';
import { Global } from '../../providers/global';

/*
  Generated class for the ProjectDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-project-detail',
  templateUrl: 'project-detail.html'
})
export class ProjectDetailPage {
  projectId: string;
  project: Project;

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private projectService: ProjectService,
    private global: Global) {
  }

  communicate() {
    this.navCtrl.push(CommunicationsPage, { id: this.projectId });
  }
  back() {
    this.navCtrl.pop();
  }
  ionViewWillEnter() {
    this.projectId = this.navParams.get('projectId');

    this.reloadProject(null);
  }
  doRefresh(refresher) {
    this.reloadProject(refresher);
  }
  reloadProject(elementComplete: any) {
    this.projectService.getProject(this.projectId)
      .subscribe(project => {
        this.project = project;
        if (elementComplete != null) {
          elementComplete.complete();
        }
      });
  }
}
