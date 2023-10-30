import { Component, OnInit } from '@angular/core';
import { ApimanagerService } from '../apimanager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{
  public apick!:any;

  constructor(private apiManager : ApimanagerService){}

  ngOnInit(): void {
    this.apiManager.getAllApicks().then((data)=>{
      this.apiManager.data = data;
      this.apiManager.setFiltered(data);
      this.apiManager.getFiltered.subscribe((data)=>{this.apick = data});
    })
  }

}
