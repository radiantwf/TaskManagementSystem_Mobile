import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
/*
  Generated class for the UserDefinedEvents provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserDefinedEventsService {
  constructor(public events: Events) {
  }
  private publish(topic, eventData): any[] {
    return this.events.publish(topic, eventData);
  }
  private subscribe(topic, handler): void {
    return this.events.subscribe(topic, handler);
  }
  private unsubscribe(topic, handler): boolean {
    return this.events.unsubscribe(topic, handler);
  }
  relatedToMeTogglePublish(eventData: boolean): any[] {
    return this.publish('relatedToMeToggle', eventData);
  }
  relatedToMeToggleSubscribe(handler): void {
    return this.subscribe('relatedToMeToggle', handler);
  }
  relatedToMeToggleUnsubscribe(handler): boolean {
    return this.unsubscribe('relatedToMeToggle', handler);
  }
  taskCreatedPublish(): any[] {
    return this.publish('task:Created', null);
  }
  taskCreatedSubscribe(handler): void {
    return this.subscribe('task:Created', handler);
  }
  taskCreatedUnsubscribe(handler): boolean {
    return this.unsubscribe('task:Created', handler);
  }
  taskEditedPublish(taskId: string): any[] {
    return this.publish('task:' + taskId + ' Edited', null);
  }
  taskEditedSubscribe(taskId: string, handler): void {
    return this.subscribe('task:' + taskId + ' Edited', handler);
  }
  taskEditedUnsubscribe(taskId: string, handler): boolean {
    return this.unsubscribe('task:' + taskId + ' Edited', handler);
  }
}
