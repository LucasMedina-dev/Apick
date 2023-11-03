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
  constructor(
    private authService: AuthService,
    private apiManager: ApimanagerService
  ) { }
  formCreator = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl(''),
    username: new FormControl(
      this.authService.getUsername(),
      Validators.required
    ),
  });
  formJson = new FormGroup({
    endpoint: new FormControl('', Validators.required),
    docs: new FormControl('', Validators.required),
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
  public docsSave: Array<EndpointStruct> = [];
  public endpointFail!: Boolean;


  saveJsonData(text: any) {
    if (
      this.jsonValid(text) &&
      !this.validateEndpointName() &&
      this.formJson.value.endpoint &&
      this.formJson.valid
    ) {
      this.buildEndpoint();
      this.pushEndpoint();
      this.docsSave.push({ ...this.endpointSave });
    } else if (!this.formJson.valid) {
      this.endpointFail = true
      alert('El nombre para su endpoint no permite espacios ni simbolos')
    } else {
      alert("El documento JSON no es valido")
    }
  }

  buildApick() {
    if(this.formCreator.valid){
      let defaultImage =
      'https://icons.veryicon.com/png/o/internet--web/internet-simple-icon/api-management.png';
      this.apickSave.username = this.authService.getUsername();
      this.apickSave.title = this.formCreator.value.title || '';
      this.apickSave.description = this.formCreator.value.description || '';
      this.apickSave.imageUrl =
        (this.formCreator.value.image != ''
          ? this.formCreator.value.image
          : defaultImage) || '';
    }else{
      console.log(this.formCreator.value)
    }
  }
  buildEndpoint() {
    this.endpointSave.username = this.authService.getUsername();
    this.endpointSave.title = this.formCreator.value.title || '';
    this.endpointSave.endpoint = this.formJson.value.endpoint || '';
    this.endpointSave.docs = JSON.parse(this.formJson.value.docs || '');
    this.endpointSave.methods = ['GET', 'POST'];
  }
  pushEndpoint() {
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
      this.endpointFail = true;
      return true;
    } else if (name === '') {
      this.endpointFail = false;
      return false;
    } else {
      this.endpointFail = false;
      return false;
    }
  }
  uploadApick() {
    this.buildApick();
    this.apiManager.registerApick(this.apickSave).subscribe({
      next: (dataApi) => {
        console.log(dataApi)
        for (let data of this.docsSave) {
          this.apiManager.registerEndpoint(data).subscribe({
            next: (res) => console.log(res)
          })
        }
      }
    })
  }
  switchMethod(method: string, endpoint: string) {
    const whereIs = this.apickSave.endpoint.find(item => item.endpoint === endpoint);
    if (whereIs) {
      const index = whereIs.methods.indexOf(method);
      if (index !== -1) {
        whereIs.methods.splice(index, 1);
      } else if (!whereIs.methods.includes(method)) {
        whereIs.methods.push(method);
      }

    }
    //console.log(whereIs) Se logra el objetivo pero no funciona el cambio de color en el button ya que no se vuelve a leer los datos
  }
}
