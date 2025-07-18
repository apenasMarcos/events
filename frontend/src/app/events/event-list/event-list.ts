import { Component, OnInit } from '@angular/core';
import { EventService, Evento } from '../event'; // Importe o serviço e a interface
import { Router } from '@angular/router';
import {DatePipe, NgForOf} from '@angular/common'; // Para navegação

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.html',
  imports: [
    DatePipe,
    NgForOf
  ],
  styleUrls: ['./event-list.css']
})
export class EventListComponent implements OnInit {
  events: Evento[] = [];
  isLoading = true; // Para feedback visual (spinner)
  errorMessage: string | null = null; // Para mensagens de erro

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar eventos:', error);
        this.errorMessage = 'Não foi possível carregar os eventos. Tente novamente mais tarde.';
        this.isLoading = false;
      }
    });
  }

  editEvent(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/events', id, 'edit']);
    }
  }

  deleteEvent(id: number | undefined): void {
    if (id && confirm('Tem certeza que deseja excluir este evento?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          console.log('Evento excluído com sucesso!');
          this.loadEvents(); // Recarrega a lista após a exclusão
        },
        error: (error) => {
          console.error('Erro ao excluir evento:', error);
          this.errorMessage = 'Não foi possível excluir o evento.';
        }
      });
    }
  }

  // Método para navegar para a tela de criação
  createNewEvent(): void {
    this.router.navigate(['/events/new']);
  }
}
