import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CepServiceService {

  constructor(private HttpClient: HttpClient) { }

  find(cep: String) {
    this.HttpClient.get(`htts://viacep.com.br/ws/${cep}/json/`)
  }
}
