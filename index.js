var express = require('express');
var util = require('util');
var base = express.Router;

var idParameter = ':id';

module.exports = function(options) {
	var router = base(options);

	router.resource = buildResource.bind(router);

	router.index   = base.get.bind(router, '/');
	router.new     = base.get.bind(router, '/new');
	router.create  = base.post.bind(router, '/');
	router.edit    = base.get.bind(router, '/'+idParameter+'/edit');
	router.show    = base.get.bind(router, '/'+idParameter);
	router.update  = base.put.bind(router, '/'+idParameter);
	router.destroy = base.delete.bind(router, '/'+idParameter);

	return router;
};

/**
 * @param {Function} callback that will be called with an error or the built resource
 */
function buildResource(resolver) {
	this.param(idParameter, function(req, res, next, id) {
		function setter(err, resource, resourceName) {
			if (err) { return next(err); }
			// autohandle 404 responses
			if (resource === null) { return res.status(404).end(); }
			
			resourceName = resourceName || 'resource';
			req[resourceName] = resource;
			next();
		};
		resolver(id, setter);
	});
};