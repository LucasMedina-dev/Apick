import { Component, OnInit } from '@angular/core';
import { ApimanagerService } from '../apimanager.service';
import { AuthService } from '../auth.service';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ApickStruct } from '../create-api/apickStruct.interface';

@Component({
  selector: 'app-your-apis',
  templateUrl: './your-apis.component.html',
  styleUrls: ['./your-apis.component.scss'],
})
export class YourApisComponent implements OnInit {
  data: any;
  creatorView:Boolean=false;
  apiView:Boolean=false;
  faChevronRight=faChevronRight;
  jsonString:any;
  
  constructor(
    private apiManager: ApimanagerService,
    private authService: AuthService
  ){}

  

  searchMyApicks() {
    this.apiManager
      .getMyApicks(this.authService.username)
      .subscribe({
        next: (data)=>this.data = data as ApickStruct
      })
  }
  openCreator(){
    this.apiView=false;
    this.creatorView=this.creatorView ? false:true;
  }
  openApi(data: any) {
    this.creatorView=false;
    this.apiView=this.apiView ? false:true;

  }
  ngOnInit(): void {
    this.searchMyApicks();
  }

}


