import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from  '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string ='';
  password : string ='';
  constructor(private fire:AngularFireAuth , private router:Router) { }

  ngOnInit(): void {
  }

  myRegister(){
    this.fire.createUserWithEmailAndPassword(this.email , this.password)
    .then(user =>{
      console.log(this.email , this.password)
      this.router.navigate(['home'])
      .catch(error =>{
        console.error(error)
      })
    })
  }

}
