import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from  '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email: string =''
password : string =''
myUid : string =''
  constructor(private fire:AngularFireAuth , private router:Router ) { }

  ngOnInit(): void {
  }

  myLogin(){
    this.fire.signInWithEmailAndPassword(this.email , this.password)
    .then(user =>{
      console.log(this.email , this.password)
      localStorage.setItem('isLoggedIn','true')
      localStorage.setItem('email',this.email)
      this.router.navigate(['home'])
      .catch(error =>{
        console.error(error)
      })
    })

    this.fire.authState.subscribe(auth=>{
      if(auth){
  
        this.myUid = auth.uid
        console.log(this.myUid)
     
      }
    })
    localStorage.setItem('uid',this.myUid)
    console.log(this.myUid)

  }

}
