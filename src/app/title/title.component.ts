import { Component } from '@angular/core';
import { NavbarSearcherService } from '../navbar-searcher.service';
@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {
  title:string=""

  constructor(private searchBar:NavbarSearcherService){}

  showSearch(){
    this.searchBar.changeState(true);
  }
}
