import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.component.html',
  styleUrls: ['feed.component.css', '../app.component.css']
})
export class FeedComponent {
  items: Observable<any[]>;
  itemsRef: AngularFireList<any>;

  constructor(private router: Router, private readonly db: AngularFireDatabase) {
    this.router = router;
    this.itemsRef = db.list('items');
    this.items = this.itemsRef.snapshotChanges();
  }

  create() {
    this.router.navigate(['/create']);
  }

  getPlaylist(id: string) {
    this.router.navigate(['/view/', id]);
  }

}
