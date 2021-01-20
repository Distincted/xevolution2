
main = {
	abs:'1',
	router_pristyne: 0,
	router_func(){
		if($scope.main.router_pristyne==2){
			$scope.main.router_pristyne = 1;
		}
	},
	router(){
		$router.run(function(rota, param){
			switch(rota){
				case '#/home':
				//	$scope.main.router_func();
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
				//	$component('main').then((res)=>{
					$component({name:'main', src: '/components/main_login.js', force:true},{} ).then((res)=>{

						$html('body',res);
						$scope.main.end();
					});
					break;

				default:
					if( $scope.main.router_pristyne === 0){
						$scope.main.router_pristyne = 1;
						vv('default rota');
						$router.go('#/home');

					}else if( $scope.main.router_pristyne == 1){
						$scope.main.router_pristyne = 2;
						vv('default rota');
					//	$router.go('#/home');						
					}else{

					}
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

	//	$component({name:'main_login'}  ).then(function(res){
		$component({name:'main', src: '/components/main_login.js', force:true},{} ).then((res)=>{

			$html('body',res);
			
			remove_db('logged', 1).then((res)=>{
				$scope.main.end();

			});
		//	vv('aqui main.js')

		});
	}
}