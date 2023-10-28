import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {
  miJson = {
    clave1: 'valor1',
    clave2: 'valor2',
    // Agrega más propiedades según tus necesidades
  };

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {

  }
}
/*id!:string;
  endpoint!:string;
  constructor(private route : ActivatedRoute){

  }
  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap)
    this.id=this.route.snapshot.paramMap.get("id") || '';
    this.endpoint=this.route.snapshot.paramMap.get("endpoint") || '';
    
  } */