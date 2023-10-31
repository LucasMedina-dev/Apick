import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-api',
  templateUrl: './create-api.component.html',
  styleUrls: ['./create-api.component.scss']
})
export class CreateApiComponent {

  constructor(private authService: AuthService){}
  formCreator= new FormGroup({
		'title':new FormControl('', Validators.required),
		'description':new FormControl('', Validators.required),
		'image':new FormControl('', Validators.required),
		'username':new FormControl('', Validators.required)
	})

  formJson= new FormGroup({
		'docs':new FormControl('', Validators.required)
	})
  jsonValidator(text:any){
    //console.log(this.formJson.value);
    if(this.jsonValid(text)){
      console.log(JSON.parse(text));
    }else{
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
}
