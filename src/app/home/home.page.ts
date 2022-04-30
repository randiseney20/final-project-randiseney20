import { Component } from '@angular/core';
import { AddNotePage } from '../add-note/add-note.page';
import { RouterModule } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { AvatarService } from '../avatar.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile = null;

  constructor(
    public navCtrl: NavController, 
    private router: Router,
    private avatarService: AvatarService,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alterController: AlertController
    ) { 
      this.avatarService.getUserProfile().subscribe((data) => {
        this.profile = data;
      });
    }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }  

  async changeImage() {
    const image = await Camera.getPhoto ({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    console.log(image);
    if(image){
      const loading = await this.loadingController.create();
      await loading.present();
      const result = await this.avatarService.uploadImage(image);
      loading.dismiss();

      if (!result){
        const alert = await this.alterController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons:['OK'],
        });
        await alert.present();
      }
    }
  }

  addNote(){
    console.log("go to add note page");
    this.router.navigate(['add-note']);
  }
}
