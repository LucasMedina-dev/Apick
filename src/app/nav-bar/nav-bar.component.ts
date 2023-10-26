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
	logueado:Boolean=false;
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

	this.loginService.tryLogin(data.username, data.password).then((res)=>{
		this.logueado=res
	})
  }
  closeSesion(){
	this.loginService.closeSesion();
	this.logueado=this.loginService.logueado
  }
}
