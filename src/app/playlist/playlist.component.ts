import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-playlist',
  templateUrl: 'playlist.component.html',
  styleUrls: ['playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  private sub: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
  	this.sub = this.route.params.subscribe(params => {
  		let id = params['id'];
  		console.log(id);
  	})
  }

}
