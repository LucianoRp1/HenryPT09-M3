// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = []; 

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests


server.post('/posts', (req, res) => {
	const {author, title, contents} = req.body;
	if(!author || !title || !contents ) return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"});
	const newPost = {
		id: posts.length + 1,
		author,
		title,
		contents
	}
	posts.push(newPost);
	res.json(newPost);
});


server.post('/posts/author/:author', (req, res) => {
	const {title, contents} = req.body;
	const {author} = req.params;
	if(!author || !title || !contents ) return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"});
	const newPost = {
		id: posts.length + 1,
		author,
		title,
		contents
	}
	posts.push(newPost);
	res.json(newPost);
});



server.get('/posts', (req, res) => {
	const {term} = req.query;
	if(!term) return res.json(posts);
	const filterPost = posts.filter(p => p.title.includes(term) || p.contents.includes(term));
	res.json(filterPost);
});

server.get('/posts/:author', (req, res) =>{
	const {author} = req.params;
	const authorPost = posts.filter(p => p.author === author);
	if (!authorPost.length) return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"});
	res.json(authorPost);
});

server.get('/posts/:author/:title', (req, res) => {
	const {author, title} = req.params;
	const filterPost = posts.filter(p => p.author === author && p.title === title);
	if (!filterPost.length) return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"});
	res.json(filterPost);
});
server.put('/posts', (req, res) => {
	const {id, title, contents} = req.body;
	if(!id || !title || !contents ) return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"});
	const post = posts.find(p => p.id === id);
	if(!post) return res.status(STATUS_USER_ERROR).json({error: "No existe Post con ese id"});
	post.title = title;
	post.contents = contents;
	res.json(post);
});
server.delete('/posts' ,(req, res) => {
	const {id} = req.body;
	if(!id) return res.status(STATUS_USER_ERROR).json({error: "No se recibio un ID"});
	const post = posts.find(p => p.id === id);
	if(!post) return res.status(STATUS_USER_ERROR).json({error: "No existe post con ese ID"});
	posts = posts.filter(p => p.id !== id);
	res.json({ success: true });
});

server.delete('/author', (req, res) => {
	const {author} = req.body;
	if(!author) return res.status(STATUS_USER_ERROR).json({error: "No encontro un author"});
	const postDelete = posts.filter(p => p.author === author)
	if(!postDelete.length) return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"});
	posts = posts.filter(p => p.author !== author);
	res.json(postDelete);
});


module.exports = { posts, server };
