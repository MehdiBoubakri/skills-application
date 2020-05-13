import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AngularFireAuth} from  '@angular/fire/auth';

@Component({
  selector: 'app-myskills',
  templateUrl: './myskills.component.html',
  styleUrls: ['./myskills.component.css']
})
export class MyskillsComponent implements OnInit {

  itemList: AngularFireList<any> 
  itemArray = []
  myUid : any
  email = ''

  data={
    name:'',
    phone: '',
    skill:'',
    province :'',
    price:'',
    comment:''
    }

  constructor( private fire:AngularFireAuth ,public db:AngularFireDatabase , public router:Router) {
  
    this.email = localStorage.getItem('email')

   this.itemList = db.list('skills') ;

   this.itemList.snapshotChanges().subscribe(actions=>{
    actions.forEach(action =>{
      let y = action.payload.toJSON()
      y['$key']=action.key
      this.itemArray.push(y as ListItemClass)
      
    })

   })
   console.log(this.itemArray)

   this.fire.authState.subscribe(auth=>{
    if(auth){

      this.myUid = auth.uid
      console.log(this.myUid)
   
      }
    }) 

  
   }
  ngOnInit(): void {
  }
  onEdit( $key ) {
        this.data.name 
        this.data.phone 
        this.data.skill 
        this.data.province 
        this.data.price 
        this.data.comment 
    
        this.itemList.set($key,{
        name: this.data.name,
        phone: this.data.phone,
        skill: this.data.skill,
        province : this.data.province,
        price: this.data.price,
        comment: this.data.comment,
        email: this.email,
        uid: this.myUid

        })


  }
  onDelete( $key ) {
    this.itemList.remove($key)
    this.itemArray = []
  }
  editForm( $key ) {
    for(let value of this.itemArray ){
      if(value['$key']== $key){
        console.log(value['$key'])
        this.data.name = value['name']
        this.data.phone = value['phone']
        this.data.skill = value['skill']
        this.data.province = value['province']
        this.data.price = value['price']
        this.data.comment = value['comment']
      }
      
    }
  }

}

export class ListItemClass {
  $key: string ;
  name : string ;
  phone : string ;
  skill : string ;
  province : string ;
  price : string ;
  comment : string;
  email : string;
  uid : String;

}
