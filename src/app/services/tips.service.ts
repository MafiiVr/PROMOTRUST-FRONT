import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tips } from '../models/Tips';
import { environment } from '../../environments/environment';

const base_url = environment.base
@Injectable({
    providedIn:'root'
})
export class TipsService{
    private url=`${base_url}/tips`;
    constructor(private http: HttpClient){}
    list():Observable<Tips[]>{
        return this.http.get<Tips[]>(this.url);
    }
}