import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public fill = {};

  private fillRef: firebase.database.Reference = firebase.database()
    .ref(`/fillUp/`);

  constructor(public navCtrl: NavController) { }

  init(odometer: number, priceGallon: number, totalGallon: number): void {
    this.fillRef.set({
      odometer,
      priceGallon,
      totalGallon
    })
  }

  ionViewDidLoad() {
    this.fillRef.on('value', fillSnapshot => {
      this.fill = fillSnapshot.val()
      if (this.fill == null) {
        this.fill = {
          odometer: 0,
          priceGallon: 0,
          totalGallon: 0
        }
      }
    });
  }

  logFillUp(odometer: number, priceGallon: number, totalGallon: number): void {
    this.fillRef.update({
      odometer,
      priceGallon,
      totalGallon
    })
  }
}
