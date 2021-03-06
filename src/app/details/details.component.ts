import { Component, OnInit } from '@angular/core';
import  { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})


export class DetailsComponent implements OnInit {

  id : any 
  itemList: AngularFireList<any> 
  itemArray = []
  data={
    name:'',
    phone: '',
    skill:'',
    province :'',
    price:'',
    comment:'',
    email : ''
    }
  constructor(public db:AngularFireDatabase, public route : ActivatedRoute) { 

    this.route.params.subscribe(params => {
      this.id = params

      this.itemList = db.list('skills') ;

      this.itemList.snapshotChanges().subscribe(actions=>{
       actions.forEach(action =>{
         let y = action.payload.toJSON()
         y['$key']=action.key
         if(action.key === this.id['']){
           
          this.itemArray.push(y as ListItemClass)
          console.log(this.itemArray[0]['name'])
          this.data.name = this.itemArray[0]['name']
          this.data.phone = this.itemArray[0]['phone']
          this.data.skill = this.itemArray[0]['skill']
          this.data.province = this.itemArray[0]['province']
          this.data.price = this.itemArray[0]['price']
          this.data.comment = this.itemArray[0]['comment']
          this.data.email = this.itemArray[0]['email']



         }
         
         
       })
   
      })
       
       console.log( this.itemArray )
     
    })
  }

  ngOnInit(): void {
    console.log(this.id[''])
    console.log(this.data)


    this.id
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
  email : string ;

}
