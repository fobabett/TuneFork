import { Component, OnInit } from '@angular/core';
import { Control, FormBuilder, Validators, ControlGroup, FORM_DIRECTIVES } from '@angular/common';
import {Observable} from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { LinkValidator } from '../link-validator';

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
  track: Control;
  form: ControlGroup;

  constructor(af: AngularFire, private router: Router, private builder: FormBuilder) {
    this.items = af.database.list('/items');
    this.playlist = [];
  }

  ngOnInit() {
    this.track = new Control('', Validators.compose([Validators.required, LinkValidator.validUrl]));
    this.form = this.builder.group({
      track: this.track
    });
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