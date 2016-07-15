import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {POSTS, GET_POST} from '../posts';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import {Store} from '@ngrx/store';

@Component({
  moduleId: module.id,
  selector: 'app-post-detail',
  templateUrl: 'post-detail.component.html',
  styleUrls: ['post-detail.component.css']
})

export class PostDetailComponent implements OnInit {
	private post:Observable<Object>
	private store:Store<any>;

 	constructor(
 		store:Store<any>,
  	private route: ActivatedRoute) {
  		this.store = store;
  		this.post = store.select(GET_POST);
	}

	getPost(id) {
		let type = GET_POST;
		let payload = {id};
		this.store.dispatch.bind(GET_POST);
	}

	ngOnInit(){
		this.route.params.subscribe(params => {
      		let id = +params['id'];
     		this.getPost(id);
    	});
	}

}
