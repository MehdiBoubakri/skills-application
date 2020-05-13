import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth} from  '@angular/fire/auth';
import  { AngularFireStorage, AngularFireUploadTask , AngularFireStorageReference } from  '@angular/fire/storage';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
email = ''
userId = ''
userKey = ''
url = ''
ref : AngularFireStorageReference 
task : AngularFireUploadTask
downloadRL : String 
data={
  name:'',
  phone: '',
  job:'',
  province :'',
  price:'',
  address:'',
  email: '',
  image: ''
 
  }
  
  itemList: AngularFireList<any> 
  itemArray = []


  constructor(private afStorage : AngularFireStorage, public db:AngularFireDatabase ,private fire:AngularFireAuth ) { 
   this.email = localStorage.getItem('email')
   console.log(this.email)
   this.fire.authState.subscribe(auth=>{
    if(auth){

      this.userId = auth.uid
      console.log(this.userId)
   
    }
  })

    

  this.itemList = db.list('users') ;

  this.itemList.snapshotChanges().subscribe(actions=>{
   actions.forEach(action =>{
     let y = action.payload.toJSON()
     y['$key']=action.key


        if(action.payload.child('uid').val() === this.userId){
          this.userKey = action.key
          this.itemArray.push(y as ListItemClass)
          this.data.name = this.itemArray[0]['name']
          this.data.phone = this.itemArray[0]['phone']
          this.data.job = this.itemArray[0]['job']
          this.data.province = this.itemArray[0]['province']
          this.data.price = this.itemArray[0]['price']
          this.data.address = this.itemArray[0]['address']
          this.data.image = this.itemArray[0]['image']
        }
   

    
    })
     
   })

   }


  ngOnInit(): void {
 
  }
 
  onEdit(){
    this.itemList.push({
      name: this.data.name,
      phone: this.data.phone,
      job: this.data.job,
      province : this.data.province,
      price: this.data.price,
      address: this.data.address,
      uid : this.userId,
      email : this.email,
      image: this.url
    })

  
}
upload(event){

        const id = Math.random().toString(36).substring(2)
        this.ref = this.afStorage.ref(id)
        this.ref.put(event.target.files[0]).then(snapshot => {
          return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
      })

      .then(downloadURL => {
        console.log(`Successfully uploaded file and got download link - ${downloadURL}`)
        this.url = downloadURL
        this.itemList.set(this.userKey,{
          name: this.data.name,
          phone: this.data.phone,
          job: this.data.job,
          province : this.data.province,
          price: this.data.price,
          address: this.data.address,
          uid : this.userId,
          email : this.email,
          image: this.url
        })
        return downloadURL
      })

      .catch(error => {
        // Use to signal error if something goes wrong.
        console.log(`Failed to upload file and get link - ${error}`)
      })


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
  image : string;

}
