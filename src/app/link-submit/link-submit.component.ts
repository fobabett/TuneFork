import { Component, OnInit } from '@angular/core';
import { Control, FormBuilder, Validators, ControlGroup, FORM_DIRECTIVES } from '@angular/common';
import {Observable} from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'link-submit',
  templateUrl: 'link-submit.component.html',
  styleUrls: ['link-submit.component.css'],
  directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class LinkSubmitComponent implements OnInit {

  items: FirebaseListObservable<any>;
  playlist: Array<any>;

  constructor(af: AngularFire, private router: Router) {
    this.items = af.database.list('/items');
    this.playlist = [];
  }

  ngOnInit() {
  }

  upload(track: string) {
  	this.playlist.push({track: track});
  }

  share() {
  	let newPlaylistRef = this.items.push(this.playlist);
    let playlistID = newPlaylistRef.key;
    this.router.navigate(['/playlist', playlistID]);
  }

}