import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoderServiceService {
  isLoading = new BehaviorSubject<string>('false')
  getLoader():Observable<string>
  {
    return this.isLoading.asObservable();
  }
  constructor() { }
}
