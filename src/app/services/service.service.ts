import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class Service {
  isLoading = false;
  constructor(public http: HttpClient, public loadCtrl: LoadingController, public toastCtrl: ToastController,) { }

  async toastCustom(message, positions) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 4000,
      position: positions
    });

    toast.dismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


  async loadingPresent() {
    this.isLoading = true;
    return await this.loadCtrl.create({
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async loadingHide() {
    this.isLoading = false;
    return await this.loadCtrl.dismiss().then(() => console.log('dismissed'));
  }


  get(request: Request) {
    return this.http.get(environment.apiUrl + request.path, {
      headers: this.getHeader(request)
    });
  }

  getHeader(request) {
    const header: HttpHeaders = new HttpHeaders();
    return header;
  }
}



export interface Request {
  path: string;
  data?: any;
  isAuth?: boolean;
}
