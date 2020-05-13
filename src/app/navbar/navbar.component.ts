import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from  '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user : Observable<firebase.User>;
   isLoggedIn: Boolean ;
  private email : String ;

constructor( private afAuth:AngularFireAuth , private router:Router) {

    this.user = afAuth.authState ;
    let status = localStorage.getItem('isLoggedIn')
    console.log("qw"+status)

    if (status == 'true') {
      // User is signed in.
      this.isLoggedIn = true
    } else {
      // No user is signed in.
      this.isLoggedIn = false
      this.router.navigate(['/login'])
    }
    this.afAuth.onAuthStateChanged(function(user) {
     
     /*if (user) {
        // User is signed in.
        this.isLoggedIn = true ;
        console.log("if" +this.isLoggedIn)
      } else {
        // No user is signed in.
        console.log("else"+this.isLoggedIn)
        this.isLoggedIn = false ;
        this.router.navigate(['/login'])
        console.log("else"+this.isLoggedIn)
      }
      */
    });
   }

  ngOnInit(): void {
  }

  logOut(){
    this.afAuth.signOut()
    localStorage.setItem('isLoggedIn','false') 
    this.router.navigate(['/login'])

  }

}
