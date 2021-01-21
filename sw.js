
//	console.log('sw.js aqui 1')
	self.addEventListener('install', function(e) {
 		e.waitUntil(
   			caches.open('agendaMaster2').then(function(cache) {

			     return cache.addAll([
					'/index.html'
					,'/components/footer.js'
					,'/components/login_.js'
					,'/components/main.js'
					,'/components/main_login.js'
					,'/components/navbar.js'
				//	,'/components/password_.js'
					,'/components/signup.js'
					,'/components/home.js'
					,'/assets/css/lib/bootstrap.min.css'
					,'/assets/css/painel.css'
					,'/assets/css/lib/example.css'
					,'/assets/js/lib/jqpobo.js'
					,'/assets/js/lib/sha512.min.js'
					,'/assets/js/tools.js'
					,'/assets/js/lib/Deg-dm_3.js'
					,'/assets/js/lib/_pindexeddb.js'
					,'/assets/img/delete.png'
					,'/assets/img/edit.png'
					,'/assets/js/lib/CalendarPicker.js'
					,'/assets/css/lib/CalendarPicker.style.css'
					,'/assets/icons/icon_24.png'
				//	,'/assets/js/lib/google_chats_line.js'
				//	,'/assets/img/icons/favicon-512x512.png'
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




	