import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Funds } from '../../Interface/all-funds.interface';
import { positions } from '../../Interface/positions.interface';
import { FundPerformance } from '../../Interface/fund-performance.inteface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  baseUrl: string = '';

  constructor(private httpClient: HttpClient) { }
  loadConfig() {
    return this.httpClient.get<any>('./assets/config.json')

    //this.baseUrl=res.baseUrl;
    //console.log(res);
  }
  getAllFunds(userName: any, token: string): Observable<any> {
    const head = new HttpHeaders({ 'Authorization': 'Basic ' + token });
    return this.httpClient.get<Funds[]>(this.baseUrl + '/api/positions/getAllFunds/' + userName, { headers: head }).pipe
    (catchError(this.handleError)
    );
    
  }
  getpositions(fundGroupId: any, mode: string, token: string): Observable<any> {
    const head = new HttpHeaders({ 'Authorization': 'Basic ' + token });
    if (mode == 'None')
      return this.httpClient.get<positions[]>(this.baseUrl + '/api/positions/getAllPositionsWithFund/' + fundGroupId + '/0', { headers: head }).pipe(
        catchError(this.handleError)
      );
    else
      //return this.httpClient.get<positions[]>(this.baseUrl+'/positions/getAllPositionsWithFund/'+fundGroupId+'/0',{headers:head});
      return this.httpClient.get<positions[]>(this.baseUrl + '/api/positions/getAllPositionsWithFund/' + fundGroupId + '/' + mode + '/0', { headers: head }).pipe(
        catchError(this.handleError)
      );

  }

  getFundperformance(fundGroupId: any, mode: string, token: string) {
    const head = new HttpHeaders({ 'Authorization': 'Basic ' + token });
    if (mode == 'None')
      return this.httpClient.get<FundPerformance[]>(this.baseUrl + '/api/positions/GetFundPerformance/' + fundGroupId + '/' + mode + '/0', { headers: head }).pipe(
        catchError(this.handleError)
      );
    else
      return this.httpClient.get<FundPerformance[]>(this.baseUrl + '/api/positions/GetFundPerformance/' + fundGroupId + '/' + mode + '/0', { headers: head }).pipe(
        catchError(this.handleError)
      );

  }
  handleError(error: any) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.' + error.status));
  }
}
