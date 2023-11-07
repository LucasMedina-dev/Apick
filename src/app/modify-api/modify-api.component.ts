import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ApimanagerService } from '../apimanager.service';
import { ApickStruct } from '../create-api/apickStruct.interface';
import { FormControl, FormGroup, Validators, FormBuilder, Form } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-modify-api',
  templateUrl: './modify-api.component.html',
  styleUrls: ['./modify-api.component.scss']
})
export class ModifyApiComponent implements OnChanges{
  @Input() data!: ApickStruct;
  formModifier = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl(''),
  });
  constructor(private formBuilder: FormBuilder){ }


  buildPreviewApick(data : ApickStruct){
    this.formModifier = this.formBuilder.group({
      title: [data.title || '', Validators.required],
      description: [data.description || '', Validators.required],
      image: [data.imageUrl || ''],
    });
  }
  switchMethod(endpoint:string, method:string){
    let endpointToModify= this.data.endpoint.find((e)=>e.endpoint===endpoint)
    if(endpointToModify){
      if(endpointToModify.methods.includes(method)){
        let index=endpointToModify.methods.indexOf(method)
        index!==-1 ? endpointToModify.methods.splice(index, 1) : null;
      }else{
        endpointToModify.methods.push(method)
      }
    }
  }
  switchEndpointStatus(endpoint:string){
    let endpointToModify= this.data.endpoint.find((e)=>e.endpoint===endpoint)
    if(endpointToModify){
      endpointToModify.active=!endpointToModify.active
    }
    console.log(this.data)
  }
  ngOnChanges(): void {
    this.buildPreviewApick(this.data)
  }
}
