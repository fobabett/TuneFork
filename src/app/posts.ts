export const POSTS = 'posts';
export const GET_POST = 'GET POST';

const defaultPosts = [
	{id: 1, title: 'title 1', body: 'body 1'},
	{id: 2, title: 'title 2', body: 'body 2'},
	{id: 3, title: 'title 3', body: 'body 3'},
	{id: 4, title: 'title 4', body: 'body 4'}
]

export const posts = (state=defaultPosts, {type, payload} = {type:null, payload:null})=> {
	switch(type) {
		case GET_POST:
			return state.map((post)=>{
				if(payload === post.id){
					return{
						title: post.title,
						body: post.body
					}
				}
				console.log(post);
				return post;
			});
		default:
			return state;				
	}
}