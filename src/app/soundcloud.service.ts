import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SoundcloudService {
  
  private soundcloudUrl = 'http://api.soundcloud.com/resolve?url=';
  constructor(private http: Http) { }

   getPlayer(url: string) {
    return this.http.get(this.soundcloudUrl + url + '&client_id=ce02307e471176a7cade6491e72a4362')
      .toPromise()
      .then(response => response.json());
  }

}
