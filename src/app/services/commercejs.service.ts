import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommercejsService {
  _Api: string = 'https://api.chec.io/v1';

  constructor(private http: HttpClient) {}
}
