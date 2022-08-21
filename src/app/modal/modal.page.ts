import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService, Note } from '../services/data.service';
//added for share
import { Share } from '@capacitor/share';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: string;


  note: Note=null;

  constructor(
    private dataService: DataService, 
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.dataService.getNoteByID(this.id).subscribe(res => {
      this.note = res;
    });
  }

 async updateNote(){
    await this.dataService.updateNote(this.note);
    const toast = await this.toastCtrl.create({
      message: 'Note updated!',
      duration: 2000
    })
    toast.present();
  }

  async emailNote(){
    await Share.share({
      title:  'Latest observations',
      text: 'The following observations were made by your instructor: \n'+ this.note.observation,
      //url: 'https://ionicacademy.com',
      dialogTitle: 'Share with Solder'
    });
    const toast = await this.toastCtrl.create({
      message: 'Note shared!',
      duration: 2000
    })
    toast.present();
  }

 async deleteNote(){
    await this.dataService.deleteNote(this.note)
    this.modalCtrl.dismiss();
  }

}
