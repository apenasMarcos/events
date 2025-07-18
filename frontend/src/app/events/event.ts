import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Importe o environment

// Defina a interface para o seu objeto Evento (ajuste conforme seu modelo de backend)
export interface Evento {
  id?: number; // Opcional, pois pode não ter ID ao criar
  nome: string;
  data: string; // Ou Date, dependendo de como você quer lidar com datas no frontend
  local: string;
  // Adicione outras propriedades do seu modelo de Evento aqui
}

@Injectable({
  providedIn: 'root' // Isso faz com que o serviço seja um singleton e esteja disponível em toda a aplicação
})
export class EventService {
  private apiUrl = `${environment.apiUrl}/events`; // Base URL para a API de eventos

  constructor(private http: HttpClient) { }

  // Método para obter todos os eventos (com paginação, se aplicável depois)
  getEvents(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  // Método para obter um evento por ID
  getEventById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }

  // Método para criar um novo evento
  createEvent(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.apiUrl, evento);
  }

  // Método para atualizar um evento existente
  updateEvent(id: number, evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.apiUrl}/${id}`, evento);
  }

  // Método para deletar um evento
  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
