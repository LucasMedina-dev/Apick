import { Component, OnInit } from '@angular/core';
import { ApimanagerService } from '../apimanager.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-your-apis',
  templateUrl: './your-apis.component.html',
  styleUrls: ['./your-apis.component.scss']
})
export class YourApisComponent implements OnInit{
  data:any;
  constructor(private apiManager : ApimanagerService, private loginService: LoginService){}
  searchMyApicks(){
    
    this.apiManager.getMyApicks(this.loginService.username).then((data:any)=>{
      this.data=data
    })
  }
  ngOnInit(): void {
    this.searchMyApicks()
  }
}
