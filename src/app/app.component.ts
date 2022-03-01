import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FORDM';

  ngOnInit(){
    var config = {
      apiKey: "AIzaSyDxbyfLk4G_9KfPofkiqLaSjlPaO-ZQxKA",
      authDomain: "dm-project-487b8.firebaseapp.com",
      databaseURL: "https://dm-project-487b8.firebaseio.com",
      projectId: "dm-project-487b8",
      storageBucket: "dm-project-487b8.appspot.com",
      messagingSenderId: "96349609311"
    };
    firebase.initializeApp(config);
  }

}
