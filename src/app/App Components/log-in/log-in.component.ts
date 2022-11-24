import { Component,OnInit,  Output, EventEmitter } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable, observable } from 'rxjs';
import { Funds } from 'src/app/Interface/all-funds.interface';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { Router } from '@angular/router'
import { ColumnApi } from 'ag-grid-community';

declare var localStorage:any;
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})

export class LogInComponent implements OnInit {

  @Output() islogin = new EventEmitter<Funds[]>();
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('isRemember') == 'true') {
      this.userName = window.atob(localStorage.getItem('token') || '').toString().split(':')[0];
      this.password = window.atob(localStorage.getItem('token') || '').toString().split(':')[1];
      this.isRemember = true;
    }
    else {
      // this.userName = '';
      // this.password = '';
    }
  }
  isChecked: boolean = true;
  isRemember: boolean = false;
  mode: string = 'nightlight_round';
  userName: any;
  password: any;
  //gridColumn!:ColumnApi;
  gridColumnApi!: ColumnApi;
  // changed(event: MatSlideToggleChange): void {
  //   this.mode = event.checked ? 'nightlight_round' : 'light_mode';
  //   document.body.classList.toggle('darkMode');
  // }
  login(): void {
    this.authService.loadConfig()
      .subscribe({
        next: (res) => {
          this.authService.baseUrl = res.baseUrl;
          this.authService.logIn(this.userName, this.password)
            .subscribe
            ({
              next: () => {
                this.islogin.emit();
             //this.router.navigate(['/position']);
                //this.router.navigate(['/positions']);
        // this.router.navigate(['/positionDemo']);
          this.router.navigate(['/QAposition']);
           
          
                //these 2 lines will be removed when base 64 will work.
                sessionStorage.setItem('isLogin', 'true');
                if (this.isRemember) {
                  localStorage.setItem('isRemember', 'true');
                }
                else {
                 localStorage.setItem('isRemember', 'false');
                }
           
              },
              
              error: () => {
                alert("Api has refused the connection Check Your credentials Or API Error.")
              }
            });
        },
        error: (error) => {
          console.log("error" + error);
        }
      });
  }


}
