import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-endpoint',
  templateUrl: './custom-endpoint.component.html',
  styleUrls: ['./custom-endpoint.component.scss']
})
export class CustomEndpointComponent implements OnInit{
  @Input() dataCustomizer!: any;

  constructor(){}
  
  ngOnInit(): void {
    console.log(this.dataCustomizer)
  }
}
