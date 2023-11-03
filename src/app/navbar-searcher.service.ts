import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarSearcherService {
  showSearcher:boolean=true;

  changeState(newState:boolean){
    this.showSearcher = newState;
  }

  constructor() { }
}
