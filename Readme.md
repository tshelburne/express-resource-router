# Express Resource Router

Simple and semantic restful resource routing for Express

## Installation

`npm install --save express-resource-router`

## Usage

The API is simple - when you require the module, you will be returned the `express.Router()` function with eight
new methods appended:

1. `resource` - allows for autoloading of the resource being described
1. `index` - sets up a '/' get route
1. `new` - sets up a '/new' get route
1. `create` - sets up a '/' post route
1. `show` - sets up a '/:id' get route
1. `edit` - sets up a '/:id/edit' get route
1. `update` - sets up a '/:id' put route
1. `destroy` - sets up a '/:id' delete route

```
// lets assume this is routes/posts.js
var router = require('express-resource-router');

router.resource(function(id, setResource) {
	// the third argument is optional - it sets req.post 
	// in this case, but req.resource is the default
	setResource(null, Post.find(id), 'post'); 
});

router.index(function(req, res) {
	res.render('posts/index', { posts: Post.all() });
});

router.new(function(req, res) {
	res.render('posts/new', { post: new Post() });
});

router.create(function(req, res) {
	var post = Post.create(/* post params */);
	res.redirect(linkTo(post));
});

router.show(function(req, res) {
	// without the third parameter above in router.resource(...), 
	// we would use req.resource
	res.render('posts/show', { post: req.post });
});

router.edit(function(req, res) {
	res.render('posts/edit', { post: req.post });
});

router.update(function(req, res) {
 	req.post.update(/* post params */);
	res.redirect('back');
});

router.destroy(function(req, res) {
	req.post.delete();
	res.redirect('/posts');
});

module.exports = router;
```

Then in your application file...

```
var app = require('express')();

app.use('/posts', require('./routes/posts'));
```

And you're good to go.

## Contribution

Right now, I need to write tests for this. If you want to, have at it. Fork and PR, baby.

## License

The MIT License (MIT)

Copyright (c) 2014 Tim Shelburne

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.