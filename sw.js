
//	console.log('sw.js aqui 1')
	self.addEventListener('install', function(e) {
 		e.waitUntil(
   			caches.open('agendaMaster2').then(function(cache) {

			     return cache.addAll([
					'/index.html'
					
			    ]);
			})
		);
	});

	self.addEventListener('fetch', function(e) {
	//	console.log(e.request.url);
		e.respondWith(
			caches.match(e.request).then(function(response) {
				return response || fetch(e.request);
			}).catch(function(err){
				console.log(err, 'Error In sw.js')
			})
		);
	});




	