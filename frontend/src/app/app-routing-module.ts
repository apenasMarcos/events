// frontend/src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './events/event-list/event-list'; // <-- Importe aqui

const routes: Routes = [
  { path: 'events', component: EventListComponent }, // <-- Adicione esta rota
  // { path: 'events/new', component: /* EventFormComponent */ null },
  // { path: 'events/:id/edit', component: /* EventFormComponent */ null },
  // { path: 'events/:id', component: /* EventDetailComponent */ null },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: '**', redirectTo: '/events' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
