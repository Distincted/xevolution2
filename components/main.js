
main = {
	abs:'1',
	router(){
		$router.run(function(rota, param){
			switch(rota){
				case '#/home':
					$component({name:'home'}).then((res)=>{
						$html('#main_section',res);
						$scope.home.end();
					});
					break;
				case '#/start':

					break;
				case '#/fazer':

					break;
				case '#/logout':
					$component('main_login').then((res)=>{
						$html('body',res);
						$scope.main_login.end();
					})
					break;

				default:
					vv('default rota')
					$router.go('#/home');
			}
		});
	},
	template(){
		return(		
			$t('div',{id:'nav_template'})+

			$container(
				$row(
					$col_md_(
					//	''+
						//$t('div',{id:'nav_template'})
						$t('div',{id:'modal_exit'})
					,12)
				)
				+$row(
					$col_md_(
						$t('div',{id:'main_section'},'')

					,12)
					
				)
				+$row(
					$col_md_(
						$t('div',{id:'footer_template'},'')

					,12)
					
				)
			)
		);

		
	},
	end(email){
		$scope.main.email = email || '';
		$component({name:'navbar'}).then(function(res){
			$html('#nav_template',res);
			$component({name:'footer'}).then(function(res){
				$html('#footer_template',res);

				$scope.main.router();
			});
		});
	},
	exit(){
	//	$router.close();

		$component({name:'main_login'}  ).then(function(res){
			$html('body',res);
			
			remove_db('logged', 1).then((res)=>{
				$scope.main_login.end();

			});
		//	vv('aqui main.js')

		});
	}
}