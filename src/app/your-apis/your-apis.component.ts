import { Component, OnInit } from '@angular/core';
import { ApimanagerService } from '../apimanager.service';
import { LoginService } from '../auth.service';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-your-apis',
  templateUrl: './your-apis.component.html',
  styleUrls: ['./your-apis.component.scss'],
})
export class YourApisComponent implements OnInit {
  data: any;
  creator=false;
  faChevronRight=faChevronRight;
  jsonString:any;

  constructor(
    private apiManager: ApimanagerService,
    private loginService: LoginService
  ){}

  formCreator= new FormGroup({
		'title':new FormControl('', Validators.required),
		'description':new FormControl('', Validators.required),
		'image':new FormControl('', Validators.required)
	})

  formJson= new FormGroup({
		'docs':new FormControl('', Validators.required)
	})

  searchMyApicks() {
    this.apiManager
      .getMyApicks(this.loginService.username)
      .then((data: any) => {
        this.data = data;
      });
  }
  openCreator(){
    this.creator=true;
  }
  ngOnInit(): void {
    this.searchMyApicks();
  }

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


