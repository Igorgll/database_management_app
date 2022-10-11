import { Clients } from './../model/Clients';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})

export class ClientService {

    constructor(private http: HttpClient){ }

    token = {
        headers: new HttpHeaders().set('Authorization', environment.token)
    }

    getClients(): Observable<Clients[]> {
        return this.http.get<Clients[]>('http://localhost:3000/clients', this.token)
    }

    getClientById(id: number):Observable<Clients> {
        return this.http.get<Clients>(`http://localhost:3000/clients/${id}`, this.token)
    }

    getClientByEmail(email: string):Observable<Clients> {
        return this.http.get<Clients>(`http://localhost:3000/clients/email/${email}`, this.token)
    }

    createNewClient(client: Clients):Observable<Clients> {
        return this.http.post<Clients>('http://localhost:3000/clients', client,this.token)
    }

    updateClient(client: Clients):Observable<Clients>{
        return this.http.put<Clients>('http://localhost:3000/clients', client, this.token)
    }

    deleteClientById(id: number){
        return this.http.delete(`http://localhost:3000/cliets/${id}`, this.token)
    }

}