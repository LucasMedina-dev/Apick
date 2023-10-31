import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ApickStruct } from './apickStruct.interface';

@Component({
  selector: 'app-create-api',
  templateUrl: './create-api.component.html',
  styleUrls: ['./create-api.component.scss'],
})
export class CreateApiComponent {
  public apick: ApickStruct = {
    username: '',
    title: '',
    imageUrl:
      'https://icons.veryicon.com/png/o/internet--web/internet-simple-icon/api-management.png',
    description: '',
    active: true,
    valoration: 0,
    endpoint: [],
  };
  public endpointExists!: Boolean;

  constructor(private authService: AuthService) {}
  formCreator = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    username: new FormControl(
      this.authService.getUsername(),
      Validators.required
    ),
  });

  formJson = new FormGroup({
    endpoint: new FormControl('', Validators.required),
    docs: new FormControl('', Validators.required),
  });
  saveJsonData(text: any) {
    if (this.jsonValid(text) && !this.validateEndpointName() && this.formJson.value.endpoint ) {
      this.apick.endpoint.push({endpoint: this.formJson.value.endpoint, active: true});
      console.log(this.apick.endpoint);
    }else {
      alert('error en el json');
    }
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
    let name=this.formJson.value.endpoint
    if (this.apick.endpoint.find((e) => e.endpoint === name)) {
      this.endpointExists = true;
      return true
    } else if (name === '') {
      this.endpointExists = false;
      return false
    } else {
      this.endpointExists = false;
      return false
    }
  }
}
