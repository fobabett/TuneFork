import {AppComponent} from './'
import { LinkSubmitComponent } from './link-submit';
import { PlaylistComponent } from './playlist';

export const PageRoutes = [
	{path: '', component: AppComponent},
	{path: 'playlist/:id', component: PlaylistComponent}
]