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
  dataToEdit!:ApickStruct;

  constructor(
    private apiManager: ApimanagerService,
    private authService: AuthService
  ){}

  

  searchMyApicks() {
    this.apiManager
      .getMyApicks(this.authService.username || localStorage.getItem("username") || "")
      .subscribe({
        next: (data)=>this.data = data as ApickStruct
      })
  }
  openApiCreator(){
    this.apiView=false;
    this.creatorView=this.creatorView ? false:true;
  }
  openApiEditor(data: any) {
    this.creatorView=false;
    this.apiView=true;
    this.dataToEdit=data;
  }
  ngOnInit(): void {
    this.searchMyApicks();
  }

}


