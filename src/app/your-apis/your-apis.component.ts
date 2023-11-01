import { Component, OnInit } from '@angular/core';
import { ApimanagerService } from '../apimanager.service';
import { AuthService } from '../auth.service';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-your-apis',
  templateUrl: './your-apis.component.html',
  styleUrls: ['./your-apis.component.scss'],
})
export class YourApisComponent implements OnInit {
  data: any;
  creator=false;
  faChevronRight=faChevronRight;
  jsonString:any;

  constructor(
    private apiManager: ApimanagerService,
    private authService: AuthService
  ){}

  

  searchMyApicks() {
    this.apiManager
      .getMyApicks(this.authService.username)
      .then((data: any) => {
        this.data = data;
      });
  }
  openCreator(){
    this.creator ? this.creator=false : this.creator=true;
  }
  ngOnInit(): void {
    this.searchMyApicks();
  }

  

  
}


