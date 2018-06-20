import { NgModule } from '@angular/core'
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@NgModule({
  declarations: [HomePage]
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) { }
}
