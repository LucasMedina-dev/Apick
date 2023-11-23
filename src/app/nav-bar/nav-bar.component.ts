import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavbarSearcherService } from '../navbar-searcher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  logueado: Boolean = false;
  closeResult = '';
  isActive: boolean = false;

  Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  formUser = new FormGroup({
    username: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24),
        Validators.pattern('[a-zA-Z0-9\u00f1\u00d1]*'),
      ])
    ),
    password: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(24),
      ])
    ),
  });
  formRegister = new FormGroup({
    username: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(24),
        Validators.pattern('[a-zA-Z0-9\u00f1\u00d1]*'),
      ])
    ),
    password: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(24),
      ])
    ),
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    fullname: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z\\s]+$'),
      ])
    ),
  });

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private navBarValue: NavbarSearcherService
  ) {}

  open(content: any) {
    this.formUser.reset();
    this.formRegister.reset();
    this.isActive = false;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
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
  onSubmit(data: any) {
    this.authService.tryLogin(data.username, data.password).subscribe({
      next: (res) => {
        this.logueado = res;
        this.authService.logueado = true;
        this.authService.username = data.username;
        this.modalService.dismissAll();
        localStorage.setItem('username', data.username);
        this.Toast.fire({
          icon: 'success',
          title: 'Signed in successfully',
        });
        setTimeout(() => location.reload(), 1000);
      },
      error: () => {
        this.isActive = true;
        this.Toast.fire({
          icon: 'error',
          title: 'Check your credentials!!',
        });
      },
    });
  }
  onRegister(data: any) {
    this.authService
      .tryRegister(data)
      .then((data) => {
        if (data.message) {
          this.isActive = true;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The user is already registered',
          });
        } else if (data._id) {
          this.modalService.dismissAll();
          Swal.fire({
            title: 'Success!',
            text: 'You register is complete!',
            icon: 'success',
          });
        }
      })
      .catch((res) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      });
  }
  closeSesion() {
    this.Toast.fire({
      icon: 'info',
      title: 'Loging out, see you soon!',
    });
    setTimeout(() => {
      this.authService.closeSesion();
      this.logueado = this.authService.logueado;
      this.renderSearch(true);
      localStorage.removeItem('username');
      this.modalService.dismissAll();
      location.reload();
    }, 1000);
  }

  resetForm() {
    this.isActive = false;
  }

  renderSearch(value: boolean) {
    this.navBarValue.changeState(value);
  }
  ngOnInit(): void {
    let username = localStorage.getItem('username');
    if (username != undefined) {
      this.logueado = true;
      this.authService.logueado = true;
      this.authService.username = username;
    }
  }
}
