import { ChangeDetectorRef, Component } from '@angular/core';
import { Data } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService, Note} from '../services/data.service';
import { ModalPage } from '../modal/modal.page';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {Auth} from '@angular/fire/auth';


@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage {
  //notes = [];
  notes: Note[] = [];

  constructor(
    private dataService: DataService,
    private alertCtrl: AlertController,
    private modaCtrl: ModalController,
    private cd: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService,
    private auth: Auth
    ) {
      this.dataService.getNotes().subscribe(res => {
        this.notes = [];
        console.log(res);
        res.forEach(element => {
          if(element.createdBy === this.auth.currentUser.uid) {
            this.notes.push(element);
          }
       });
        this.cd.detectChanges();
      });
   }

   async addNote(){
    const alert = await this.alertCtrl.create({
      header: 'Add Note',
      inputs: [
        {
          name: 'name',
          placeholder: 'Last, First',
          type: 'text'
        },
        {
          name: 'rank',
          placeholder: 'RANK',
          type: 'text'
        },
        {
         name: 'cell',
         placeholder: 'Soldier email',
         type: 'text'
       },
       {
         name: 'observation',
         placeholder: 'Observations',
         type: 'textarea'
       }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (res) => {
            this.dataService.addNote({name: res.name, rank: res.rank, cell: res.cell, observation: res.observation, createdBy: this.auth.currentUser.uid});
          }
        }
      ]
    });
    await alert.present();
  }

   async openNote(note: Note){
     const modal = await this.modaCtrl.create({
       component: ModalPage,
       componentProps: {id: note.id},
       breakpoints: [0,0.5,1],
       initialBreakpoint: 0.8
     });
     return await modal.present();
   }

   async goHome(){
    console.log("go to homepage");
    await this.router.navigate(['home']);
  }
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }
}
