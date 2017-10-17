import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.component.html',
  styleUrls: ['feed.component.css', '../app.component.css']
})
export class FeedComponent {
  items: Observable<any[]>;

  constructor(private router: Router, db: AngularFirestore) {
    this.router = router;
    this.items = db.collection('items').valueChanges();
    console.log(this.items)
  }

  create() {
    this.router.navigate(['/create']);
  }

  getPlaylist(id: string) {
    this.router.navigate(['/view/', id]);
  }

}
