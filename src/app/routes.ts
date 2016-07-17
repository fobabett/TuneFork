import {AppComponent} from './'
import { LinkSubmitComponent } from './link-submit';
import { PlaylistComponent, ForkedPlaylistComponent } from './playlist';

export const PageRoutes = [
	{path: '', component: AppComponent},
	{path: 'playlist/:id', component: PlaylistComponent},
	{path: 'playlist/:id/fork', component: ForkedPlaylistComponent}
]