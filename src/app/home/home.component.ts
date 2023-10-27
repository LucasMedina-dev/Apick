import { Component, OnInit } from '@angular/core';
import { ApimanagerService } from '../apimanager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  public apick:any;
  constructor(private apiManager : ApimanagerService){}
  ngOnInit(): void {
    this.apiManager.getAllApicks().then((data)=>{
      this.apick=data;
    })
  }
}
