import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AngularFireAuth} from  '@angular/fire/auth';



@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.component.html',
  styleUrls: ['./addskill.component.css']
})
export class AddskillComponent implements OnInit {
  
  name='';
  phone='';
  skill='';
  province ='';
  price='';
  comment=''; 
  email = ''

  data={
  name:'',
  phone: '',
  skill:'',
  province :'',
  price:'',
  comment:''
  }

 
  itemList: AngularFireList<any>;
  uid : any;


  constructor(private fire:AngularFireAuth, public db:AngularFireDatabase, public router:Router) {

   this.itemList = db.list('skills') ;

   this.fire.authState.subscribe(auth=>{
     if(auth){
       this.uid = auth.uid
       this.email = auth.email
       console.log(this.uid)
       }
     })
   }
  
  
  ngOnInit(): void {
    console.log(this.email)
  }

   insertSkill(){
    this.itemList.push({
      name: this.data.name,
      phone: this.data.phone,
      skill: this.data.skill,
      province : this.data.province,
      price: this.data.price,
      comment: this.data.comment,
      email : this.email,
      uid : this.uid
    })

    this.router.navigate(['/myskills'])

  }
  

}
