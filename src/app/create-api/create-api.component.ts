import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ApickStruct } from './apickStruct.interface';
import { EndpointStruct } from './endpointStruct.interface';
import { ApimanagerService } from '../apimanager.service';

@Component({
  selector: 'app-create-api',
  templateUrl: './create-api.component.html',
  styleUrls: ['./create-api.component.scss'],
})
export class CreateApiComponent {
  constructor(private authService: AuthService, private apiManager: ApimanagerService) {}
  formCreator = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    username: new FormControl(
      this.authService.getUsername(),
      Validators.required
    ),
  });
  public apickSave: ApickStruct = {
    username: '',
    title: '',
    imageUrl:
      'https://icons.veryicon.com/png/o/internet--web/internet-simple-icon/api-management.png',
    description: '',
    active: true,
    valoration: 0,
    endpoint: [],
  };
  public endpointSave: EndpointStruct = {
    username: '',
    title: '',
    active: true,
    endpoint: '',
    docs: [],
    methods: [],
  };
  public docsSave:Array<any>=[];
  public endpointExists!: Boolean;

  

  formJson = new FormGroup({
    endpoint: new FormControl('', Validators.required),
    docs: new FormControl('', Validators.required),
  });
  saveJsonData(text: any) {
    if (this.jsonValid(text) && !this.validateEndpointName() && this.formJson.value.endpoint) {
      this.buildApick()
      this.buildEndpoint()
      this.pushEndpoint()
      this.docsSave.push(this.endpointSave)
    } else {
      alert('error en el json');
    }
  }

  buildApick(){
    this.apickSave.username=this.authService.getUsername();
    this.apickSave.title=this.formCreator.value.title || '';
    this.apickSave.description=this.formCreator.value.description || '';
    this.apickSave.imageUrl=this.formCreator.value.image || '';
  }
  buildEndpoint(){
    this.endpointSave.username=this.authService.getUsername();
    this.endpointSave.title=this.formCreator.value.title || '';
    this.endpointSave.endpoint=this.formJson.value.endpoint || '';
    this.endpointSave.docs=this.formJson.value.docs;
    this.endpointSave.methods=['GET','POST']
    
  }
  pushEndpoint(){
    this.apickSave.endpoint.push({
      endpoint: this.formJson.value.endpoint || '',
      active: true,
      methods: ['GET', 'POST'],
    });
  }

  jsonValid(jsonString: string): boolean {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }
  validateEndpointName() {
    let name = this.formJson.value.endpoint;
    if (this.apickSave.endpoint.find((e) => e.endpoint === name)) {
      this.endpointExists = true;
      return true;
    } else if (name === '') {
      this.endpointExists = false;
      return false;
    } else {
      this.endpointExists = false;
      return false;
    }
  }
  uploadApick(){
    console.log(this.apickSave)
    console.log(this.docsSave)
  }
}
