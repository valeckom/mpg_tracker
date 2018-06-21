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

  isFirstFill = true;
  pullData = {};
  mpg = 0;
  fillDataRef: firebase.database.Reference = firebase.database()
    .ref(`/fillData/`);

  mpgCalc(firstOdo: number, newOdo: number, gal: number): void {
    var mi = newOdo - firstOdo;
    this.mpg = mi / gal;
  }

  dispUpdate(newMpg, newCost): void {
    try {
      this.disp = {
        mpg: newMpg.toFixed(1).toString(),
        totalCost: newCost.toFixed(2).toString()
      }
    }
    catch{ }
  }

  ionViewDidLoad() {
    this.fillDataRef.on('value', fillSnapshot => {
      if (fillSnapshot.val() != null) {
        this.isFirstFill = false;
        this.pullData = fillSnapshot.val();
        this.dispUpdate(this.pullData.milesPerGallon,
          this.pullData.cost)
      }
    });
  }

  logFillUp(odometer: number, cost: number, gallons: number): void {
    // Check for empty feilds
    if (this.odometer != null &&
      this.priceGallon != null &&
      this.totalGallon != null) {
      if (this.isFirstFill) {
        this.fillDataRef.update({
          firstOdometer: odometer,
          cost,
          gallons
        })
      }
      else if (this.odometer > this.pullData.firstOdometer) {
        gallons = +gallons + +this.pullData.gallons;
        cost = (+cost * +gallons) + +this.pullData.cost;

        this.mpgCalc(this.pullData.firstOdometer, odometer, gallons)

        this.fillDataRef.update({
          cost,
          gallons,
          milesPerGallon: this.mpg
        })
      }
      this.odometer = null;
      this.priceGallon = null;
      this.totalGallon = null;
    }
  }
}
