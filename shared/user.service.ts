import { Injectable } from '@angular/core';
import { User } from './User';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  userListRef: AngularFireList<any>;
  userRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  private createUser(facebookID: string, name: string, email: string){
    let usr: User;
    usr.facebookID = facebookID;
    usr.name = name;
    usr.email = email;
    usr.type = "standard";

    return this.userListRef.push({
      facebookID: usr.facebookID,
      name: usr.name,
      email: usr.email
    })
  }

  //Create a user based on facebookID
  createFacebookUser(user){
    if (this.userExist(user.id) == false) { this.createUser(user.id, user.name, user.email); }
  }

  getUser(facebookID: string) {
    let usr: User;
    this.userRef = this.db.object('/user/' + facebookID);
    this.userRef.snapshotChanges().subscribe(user => { user = user });
    return usr;
  }

    userExist(facebookID: string){
      if(this.getUser(facebookID).facebookID == facebookID) {return true;}
      else {return false;}
    }

  getUserList(){
    this.userListRef = this.db.list('/user');
    return this.userListRef;
  }

  updateUser(facebookID, username: string, type: string){
    let usr: User;
    usr = this.getUser(facebookID);

    return this.userRef.update({
      facebookID: usr.facebookID,
      name: username,
      email: usr.email,
      type: type
    })
  }
}
