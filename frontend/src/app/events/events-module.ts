import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing-module';
import { EventListComponent } from './event-list/event-list';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    EventListComponent
  ],
  exports: [
    EventListComponent
  ]
})
export class EventsModule { }
