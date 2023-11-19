import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  FormGroup,  FormControl, Validators} from '@angular/forms';
import { NavbarSearcherService } from '../navbar-searcher.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
	logueado:Boolean=false;
	closeResult = '';
	isActive:boolean = false;

	formUser= new FormGroup({
		'username':new FormControl('', Validators.required),
		'password':new FormControl('', Validators.required)
	})
	formRegister= new FormGroup({
		'username':new FormControl('', Validators.required),
		'password':new FormControl('', Validators.required),
		'email':new FormControl('', Validators.required),
		'fullname':new FormControl('', Validators.required)
	})



	constructor(private modalService: NgbModal, private authService: AuthService, private navBarValue: NavbarSearcherService) {}


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
		this.authService
		.tryLogin(data.username, data.password)
		.subscribe({
			next: (res)=>{
				this.logueado=res
				this.authService.logueado=true;
				this.authService.username=data.username;
				this.modalService.dismissAll()
				localStorage.setItem("username", data.username)
			},
			error: ()=>{
				this.isActive = true;	
			}
		})
		
	}
	onRegister(data:any){
		this.authService.tryRegister(data)
		.catch((res)=>{
			alert('Error al registro');
		})
	}
	closeSesion(){
		this.authService.closeSesion();
		this.logueado=this.authService.logueado
		this.renderSearch(true)
		localStorage.removeItem("username")
	}

	resetForm(){
		this.isActive = false;
	}

	renderSearch(value:boolean){
		this.navBarValue.changeState(value);
	}
	ngOnInit(): void {
		let username=localStorage.getItem("username")
		if(username!=undefined){
			this.logueado=true
			this.authService.logueado=true;
			this.authService.username=username;
		}else{
			console.log("es undefined")
		}
	}
}
