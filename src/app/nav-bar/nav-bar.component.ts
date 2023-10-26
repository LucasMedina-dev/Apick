import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  FormGroup,  FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
  closeResult = '';
  formUser= new FormGroup({
    'username':new FormControl('', Validators.required),
    'password':new FormControl('', Validators.required),
  })
  username= new FormControl('', Validators.required)
  password= new FormControl('', Validators.required)

	constructor(private modalService: NgbModal, private loginService: LoginService) {
    
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

	open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
  onSubmit(data:any){
    const status= this.loginService.tryLogin(data.username, data.password)
	console.log(status.subscribe(res=>console.log(res)))
  }

}
