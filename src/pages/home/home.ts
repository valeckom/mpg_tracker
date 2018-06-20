import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public disp = { mpg: 'empty', totalCost: '' };

  constructor(public navCtrl: NavController) { }

  lastFill = {};
  fill = {};
  fillRef: firebase.database.Reference = firebase.database()
    .ref(`/fillUp/`);

  ionViewDidLoad() {
    this.fillRef.on('value', fillSnapshot => {
      if (fillSnapshot.val() != null) {
        this.lastFill = fillSnapshot.val();
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
