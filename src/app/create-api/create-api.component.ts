import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ApickStruct } from './apickStruct.interface';
import { EndpointStruct } from './endpointStruct.interface';
import { ApimanagerService } from '../apimanager.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-api',
  templateUrl: './create-api.component.html',
  styleUrls: ['./create-api.component.scss'],
})
export class CreateApiComponent {
  public docsSave: Array<EndpointStruct> = [];
  public endpointFail!: Boolean;

  formCreator = new FormGroup({
    title: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.maxLength(30)])
    ),
    description: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.maxLength(30)])
    ),
    image: new FormControl(''),
    username: new FormControl(
      this.authService.getUsername(),
      Validators.required
    ),
  });

  formJson = new FormGroup({
    endpoint: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern('[a-zA-Z0-9]*'),
      ])
    ),
    docs: new FormControl('', Validators.required),
  });

  public apickSave: ApickStruct = {
    _id: '',
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
  constructor(
    private authService: AuthService,
    private apiManager: ApimanagerService
  ) {}

  saveJsonData(text: any) {
    let endpoint = this.formJson.value.endpoint;
    let flag = this.apickSave.endpoint.find((e) => e.endpoint === endpoint);
    if (!flag) {
      if (this.jsonValid(text) && this.formJson.valid) {
        this.buildEndpoint();
        this.pushEndpoint();
        this.docsSave.push({ ...this.endpointSave });
      } else if (!this.formJson.valid) {
        this.endpointFail = true;
        Swal.fire(
          'The name for your endpoint does not allow spaces or symbols.'
        );
      } else {
        Swal.fire('The JSON document is not valid.');
      }
    } else {
      Swal.fire('The endpoint name already exists.');
    }
  }

  buildApick() {
    if (this.formCreator.valid) {
      let defaultImage =
        'https://icons.veryicon.com/png/o/internet--web/internet-simple-icon/api-management.png';
      this.apickSave.username = this.authService.getUsername();
      this.apickSave.title = this.formCreator.value.title || '';
      this.apickSave.description = this.formCreator.value.description || '';
      this.apickSave.imageUrl =
        (this.formCreator.value.image != ''
          ? this.formCreator.value.image
          : defaultImage) || '';
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
  uploadApick() {
    this.buildApick();
    let apickToSave = this.apickSave;
    for (let endpoint of apickToSave.endpoint) {
      if (endpoint.methods.length === 0) {
        endpoint.active = false;
      }
    }
    let actives = apickToSave.endpoint.find(
      (element) => element.active === true
    );
    if (!actives) {
      apickToSave.active = false;
    }
    delete apickToSave._id;
    this.apiManager.registerApick(this.apickSave).subscribe({
      next: (result) => {
        console.log(result.message)
        if (result.message) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: (result.message.title? 'The name for your api already exists.' : 'Fill the description.' ),
            showConfirmButton: false,
          });
        } else {
          let apiId = result._id;
          console.log(apiId)
          this.apiManager.createApiKey(apiId).subscribe({
            next: (response) => {
                console.log(response)
            },
          });
          for (let endpoint of this.docsSave) {
            if (endpoint.methods.length === 0) {
              endpoint.active = false;
            }
            this.apiManager.registerEndpoint(endpoint).subscribe({
              next: () => {                  
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your api has been created',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                 setTimeout(() => location.reload(), 1500);
              },
              error(err) {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Your api could not be created.',
                  showConfirmButton: false,
                  timer: 1500,
                });
              },
            });
          }
        }
      },
    });
  }

  switchMethod(method: string, endpoint: string) {
    const whereIs = this.apickSave.endpoint.find(
      (item) => item.endpoint === endpoint
    );
    if (whereIs) {
      const index = whereIs.methods.indexOf(method);
      if (index !== -1) {
        whereIs.methods.splice(index, 1);
      } else if (!whereIs.methods.includes(method)) {
        whereIs.methods.push(method);
      }
    }
  }
}
