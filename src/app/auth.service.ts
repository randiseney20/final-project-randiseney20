import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
//import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) { }

  async register({email, password}){
        try{
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      console.log(user)
      return user;
    } catch (e) {
      console.log(e.code)
      return e.code;
    }
  }
  async login({email, password}){
    try{
      const user = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      return  e.code;
    }
  }

  logout(){
    return signOut(this.auth);
  }    
  
}
