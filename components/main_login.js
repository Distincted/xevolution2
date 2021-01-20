
main_login = {
	abs:'1',
	router(){
		$router.run( function(rota, params){
		//	vv(rota,'rota main_login.js')
			switch(rota){
				case'#/login':
					get_values_db('agenda').then((res)=>{
					//	vv(res,'res')
						$component( {name: 'login_', async: true,  promise: true }, res, '#res_login' ).then((res)=>{
							$html('#res_login', res);
							$component('password_').then((res)=>{
								$scope.login_.open_field();

							});
						});

					});
					break;
				case'#/signup':
					$component( {name: 'signup', async: true,  promise: true } ).then((res)=>{
						$html('#res_login', res);
						$scope.signup.open_field();
						$scope.signup.end_load();
						
						
						//	var results = $.getJSON("/assets/js/world-cities_json.json", function(data) {
							//	debug = data;

								/*
								data = debug.filter((v, x)=>{
								  return v.country =='Venezuela'
								});
								*/
									/*
								var uniqueNames = [];
								$.each(data, function(i, el){
								    if($.inArray(el.country, uniqueNames) === -1) uniqueNames.push(el);

								});


								vv(uniqueNames,'main_login');

								debug = uniqueNames;
								$for( function(v){
									$("#sel_country").append('<option value="' + v + '">' + v.country + '</option');
									
								}, uniqueNames );
							
								for(var i = 0; i < uniqueNames.length; i++) {
									$("#btn_country").append('<option value="' + data[i] + '">' + data[i] + '</option');
									}
								}
								*/
						//	});

						});
					break;
				default:
					vv('default rota')
					$router.go('#/login');
			}

		});
	},
	template(data){
	//	vv(data,'main_login.js')
		return new Promise((resolve)=>{

			resolve(
				$t1('input', { type: 'hidden', name: 'csrf', value: data.csrf})+

				$t2('div', {class: 'container-fluid'},
					$t2('header', {},
						$t1('hr')
					)
				)+
				$container(
					$t2('div', {class: 'loader',style: 'text-align: center;'},
						''
					)+	
					$row(
						$col_md_(
							''
						,2)+
						$col_md_(

							$t2('div', {id:'res_login'},

							)
						//	+$t2('div', {id: 'saida'},'')
							
						,8)+
						$col_md_(
							''
						,2)
					)+
					$t1('hr')+
					$row(
						$col_md_(

						//7	$t('div',{id:'webhostapp_id'})+
							$t('div',{id:'footer_id'})
						
						)
					)
				,{style: ''})

			);
		});
	},
	end(){
		$component({name: 'footer', async: true, promise:true}).then((res)=>{
			$html('#footer_id', res);
			$scope.main_login.router();

			/*
			$component({name: 'webhostapp', async: true, promise:true}).then((res)=>{
				$html('#webhostapp_id',res);
				$scope.main_login.router();
			});
			*/
		});
	}
}