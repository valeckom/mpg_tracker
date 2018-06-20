import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen, private androidFullScreen: AndroidFullScreen,
    private screenOrientation: ScreenOrientation) {

    firebase.initializeApp({
      apiKey: "AIzaSyDTMaov-WpmIZMXjhNmAzzZyvuav-s6FBI",
      authDomain: "mvapp-40306.firebaseapp.com",
      databaseURL: "https://mvapp-40306.firebaseio.com",
      projectId: "mvapp-40306",
      storageBucket: "mvapp-40306.appspot.com",
      messagingSenderId: "641101366698"
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      this.androidFullScreen.isImmersiveModeSupported()
        .catch(err => console.log(err));

      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
        .catch(err => console.log(err));

      splashScreen.hide();
    });
  }
}
