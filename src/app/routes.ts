import {AppComponent} from './'
import {PostDetailComponent} from './post-detail';
import { LinkSubmitComponent } from './link-submit';
import { PlaylistComponent } from './playlist';

export const PageRoutes = [
	{path: '', component: AppComponent},
	{path: 'playlist', component: PlaylistComponent}
]