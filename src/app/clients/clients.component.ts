import { Component, OnInit } from '@angular/core';
import { ClientService } from './../service/clients.service';
import { Clients } from './../model/Clients';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  searchText: any;

  //modals text
  title = 'Clients List';
  create = 'Create New Client';
  update = 'Update Client';

  categories = [
    {
      first: 'Name',
      second: 'Last Name',
      third: 'Address',
      fourth: 'postalCode',
      fifth: 'City',
    },
  ];

  client: Clients = new Clients();
  listClients: Clients[];
  idClient: number;

  constructor(
    private router: Router,
    private clientsService: ClientService,
    private route: ActivatedRoute,
    private http:  HttpClient
  ) {}

  consultaCep(cep:any, form:any) {
    cep = cep.replace(/\D/g, '');

    if (cep != "") {
      let validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        this.http.get(`//viacep.com.br/ws/${cep}/json/`)
        .pipe(map((dados: any) => dados))
        .subscribe(dados => this.populaDadosForm(dados, form));
      }
    }
  }

  populaDadosForm(dados:any, form:any) {
    form.setValue({
        name: form.value.name,
        lastName: form.value.lastName,
        postalCode: dados.cep,
        address: dados.logradouro,
        city: dados.localidade
    })
  }

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/login']);
    }
    this.getAllClients();
  }

  getId(id: number) {
    this.idClient = id;
    this.findClientById(this.idClient);
  }

  findClientById(id: number) {
    this.clientsService.getClientById(id).subscribe((resp: Clients) => {
      this.client = resp;
    });
  }

  getAllClients() {
    this.clientsService.getClients().subscribe((resp: Clients[]) => {
      this.listClients = resp;
    });
  }

  postNewClient() {
    this.clientsService.createNewClient(this.client).subscribe({
      next: (resp: Clients) => {
        this.client = resp;
        alert('New Client added!');
        this.getAllClients();
        this.client = new Clients();
      },

      error: (err) => {
        if (err.status == 400) {
          alert('Please, fill out all fields.');
        }
      },
    });
  }

  putClient(id: number) {
    this.clientsService
      .updateClient(this.idClient, this.client).subscribe({
        next: (resp: Clients) => {
        this.client = resp;
        alert('Client updated successfully!');
        this.getAllClients();
      },
      error: (err) => {
        if (err.status == 400) {
          alert('Please, fill out all fields.');
        }
      }
    });
  }

  delete(id: number) {
    this.clientsService.deleteClientById(id).subscribe(() => {});
    alert('Client deleted successfully!');
    this.getAllClients();
  }
}
