import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {Funds} from '../../Interface/all-funds.interface';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }
  
  fundList!:Funds[];
  token!:string;
  //baseUrl:string='https://localhost:44326';
  baseUrl:string='';
  userName!:string;
  password:any;

  base64Token(userName:string,password:string)
  {
    this.token = window.btoa(userName+':'+password);
    localStorage.setItem('token',this.token);
  }

  getUserFromToken(){
    this.userName= window.atob(localStorage.getItem('token')||'').toString().split(':')[0];
    return this.userName;
  }
  loadConfig() {
    return this.httpClient
      .get<any>('./assets/config.json')
      
      //this.baseUrl=res.baseUrl;
      //console.log(res);
  }
  logIn(userName:string,password:string)
  {
    
    //this.baseUrl=res.baseUrl;
        this.base64Token(userName,password);
    const head=new HttpHeaders({'Authorization':'Basic '+ this.token});
    var uniqueid = userName + '_' + Math.random().toString(36).substring(2, 9);
    //var uniqueId= userName+'_'+Math.random().toString(36).substring(2,11);
    return this.httpClient.get<Funds[]>(this.baseUrl+'/api/positions/getAllFunds/'+userName+'/'+uniqueid, {headers:head});
  }

  logOut()
  {

  }
}
