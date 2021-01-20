

	navbar = {
		abs: 'navbar<-1',

		template(){
			
			return new Promise((resolve, reject)=>{
				resolve(
					$t2('nav',{ "class":"navbar navbar-icon-top navbar-expand-md navbar-dark bg-dark" },
				
						$t2('button', { "class":"navbar-toggler","type":"button","data-toggle":"dropdown","data-target":"#navbarSupportedContent", 'aria-haspopup':'false',  "aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation" },
							$t2('span',{ "class":"navbar-toggler-icon" })		
						)+
						$t2('div',{ "class":"collapse navbar-collapse","id":"navbarSupportedContent", style:'background-color: #1d1e20;' },
							$t2('ul',{ "class":"navbar-nav mr-auto" },
								/*
								$t2('li', { "class":"nav-item active" },
									$t2('a',{ "class":"nav-link","href":"/" },
										$t2('i',{ "class":"fa fa-home " })
										+$t2('span',{ "class":"sr-only" },
											'(current)'
										)
									)				
								)+
								*/
								$t2('li', { "class":"nav-item" },
									$t2('a',{ "class":"nav-link cp", href:'#/start', offclick: '$scope.navbar.home()' },
										$t2('i',{ "class":"fa fa-home" },
											$t2('span',{ "class":"badge badge-danger" },
												'11'
											)						
										)+
										'Home'
									)				
								)
								
								/*
								$t2('li', { "class":"nav-item dropdown" },
									$t2('a',{ "class":"cp nav-link dropdown-toggle","id":"navbarDropdown","role":"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false", href:'#/start' },
										$t2('i',{ "class":"fa fa-list-alt" },
											
										)
										+'Anuncios'
									)+
									$t2('div',{ "class":"dropdown-menu cp","aria-labelledby":"navbarDropdown" },
										$t2('a',{ class:"dropdown-item", href:'#/buy'},
											$t('i',{class:'fa fa-outdent'})+
											'Ver Anuncios'
										)
										+$t2('a',{ class:"dropdown-item",href:'#/adscreate'},
											$t('i',{class:'fa fa-list-ol'})+
											'Anunciar'
										)
										+$t2('a',{ class:"dropdown-item",href:'#/myads'},
											$t('i',{class:'fa fa-list-ol'})+
											'Meus Anuncios'
										)

										
									//	+$t2('a',{ class:"dropdown-item",href:'#/perfil', offclick: '$scope.navbar.perfil()'},
									//		$t('i',{class:'fa fa-list-ol'})+
									//		'Meu Perfil'
									//	)
										

									)	
								)
								*/
								+$t2('li', { "class":"nav-item" },
										$t2('a',{ "class":"nav-link cp",hreff:'', onclick:'$scope.navbar.config()' },
											$t2('i',{ "class":"fa fa-money" },
												$t2('span',{ "class":"badge badge-danger" },
												''
											)						
										)+
										'Config'
									)			
								)
								
								
							)+

						$t('div', { "class":"box" },
							$t('div', { "class":"container-2 nav-item" },
								$t('span',{ "class":"icon" },
									$t('button',{ "class":"fa fa-search btn btn-seach", onclick: "$scope.navbar.search_go(); " })
									+$t('input',{ "type":"search","id":"search", class:'sea_search', placeholder:'Pesquisar...', onkeyup: '$scope.navbar.search_keyup(this, event);' })
								)
							)
						)+
						
							$t2('ul',{ "class":"navbar-nav " },
								
								$t2('li', { "class":"nav-item" },
									$t2('a',{ "class":"nav-link","href":"#" },
										$t2('i',{ "class":"fa fa-bell" },
											$t2('span',{ "class":"badge badge-info" },
												'11'
											)						
										)+
										'Notificações'
									)				
								)+
								$t2('li', { "class":"nav-item" },
										$t2('a',{ "class":"nav-link cp","offclick": '$scope.main.exit()', href:'#/logout' },
											$t2('i',{ "class":"fa fa-sign-out" },
												$t2('span',{ "class":"badge badge-success" },
											/*	'11'   */
											)
										)+
										'Sair'
									)
								)
							)
						)
					)
				);
			});
		},
		config(){
			$component('modal_bootstrap').then((res)=>{
				$html('#modal_exit', res );
				$('.modal').show();
			});
		},
		
		exiting(){
		//	return;
			
			
		},		
		open_noty: (val)=>{
			var text= '';
			switch(val){
				case 1:
					//notiry
					text = 'notify';
					break;
				case 2:
					// batepapo
					text = 'batepapo';
					break;
				case 3:
					//bar_npes
					text = 'barnpes';
					break;
				default: 
					return;
			}
			var testing = ['notiry','batepapo','barnpes'];
			if( parseInt( $('#'+text+' #res_npes').html().trim())>0 ||true){

				$.post( get_base_url()+'/start/notify_number_people', {open: 1, type_text: text}, function(data){
					//'#res_npes',0);
					var retorno = JSON.parse(data);
					$('#res_npes').html( retorno['noti_people'] );
				});
				
				
			}
			var teste = $('#'+text+' div:nth-last-child(1)').attr('class');
		//	console.log(teste);
			if( teste=='noting d-none'){
				$('#'+text+' div:nth-last-child(1)').removeClass('d-none');
			}else{
				$('#'+text+' div:nth-last-child(1)').addClass('d-none');
			}
		},
		notify: function(data, increment){
			if(data.length==0){
				return '';
			}
		//	$vv(data, 'notifys');
			return(
				$t2('ul', {},
					$for((data1)=>{
						return '<a href="" >'+'<li>'+data1.text_people+'</li></a>';
					}, data	)
					+
					$t2('div', { "style":"text-align: center;","class":"woerw" },
						$t2('a',{ "href":"","class":"color1" },'Ver Todas Notificações'
						 
						)
					)	
				)
			)
		},
		search_go: function(){
		//	let val = $('#inputSearch').val();
			let val = (typeof var_main.sea == 'undefined')?(''):(var_main.sea);
			$router.go('#/buy?page='+1+'&sea='+val );

		},
		search_keyup( thiss, evento){
			if(evento.keyCode==13){
			//	vv(evento,'navbar');
				$scope.navbar.search_go();
			}else{
				var_main.sea = (thiss.value);
			}
		},
		search_go_enter(){
			document.getElementById("search").onkeypress = function(e) {
				if (e.keyCode == 13) {
					$scope.navbar.search_go();
					e.preventDefault();
				}
			}
		},
		style(){
			return(`
				
				@import url("//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

				.navbar-icon-top .navbar-nav .nav-link > .fa {
				  position: relative;
				  width: 36px;
				  font-size: 24px;
				}

				.navbar-icon-top .navbar-nav .nav-link > .fa > .badge {
				  font-size: 0.75rem;
				  position: absolute;
				  right: 0;
				  font-family: sans-serif;
				}

				.navbar-icon-top .navbar-nav .nav-link > .fa {
				  top: 3px;
				  line-height: 12px;
				}

				.navbar-icon-top .navbar-nav .nav-link > .fa > .badge {
				  top: -10px;
				}

				@media (min-width: 576px) {
				  .navbar-icon-top.navbar-expand-sm .navbar-nav .nav-link {
				    text-align: center;
				    display: table-cell;
				    height: 70px;
				    vertical-align: middle;
				    padding-top: 0;
				    padding-bottom: 0;
				  }

				  .navbar-icon-top.navbar-expand-sm .navbar-nav .nav-link > .fa {
				    display: block;
				    width: 48px;
				    margin: 2px auto 4px auto;
				    top: 0;
				    line-height: 24px;
				  }

				  .navbar-icon-top.navbar-expand-sm .navbar-nav .nav-link > .fa > .badge {
				    top: -7px;
				  }
				}

				@media (min-width: 768px) {
				  .navbar-icon-top.navbar-expand-md .navbar-nav .nav-link {
				    text-align: center;
				    display: table-cell;
				    height: 70px;
				    vertical-align: middle;
				    padding-top: 0;
				    padding-bottom: 0;
				  }

				  .navbar-icon-top.navbar-expand-md .navbar-nav .nav-link > .fa {
				    display: block;
				    width: 48px;
				    margin: 2px auto 4px auto;
				    top: 0;
				    line-height: 24px;
				  }

				  .navbar-icon-top.navbar-expand-md .navbar-nav .nav-link > .fa > .badge {
				    top: -7px;
				  }
				}

				@media (min-width: 992px) {
				  .navbar-icon-top.navbar-expand-lg .navbar-nav .nav-link {
				    text-align: center;
				    display: table-cell;
				    height: 70px;
				    vertical-align: middle;
				    padding-top: 0;
				    padding-bottom: 0;
				  }

				  .navbar-icon-top.navbar-expand-lg .navbar-nav .nav-link > .fa {
				    display: block;
				    width: 48px;
				    margin: 2px auto 4px auto;
				    top: 0;
				    line-height: 24px;
				  }

				  .navbar-icon-top.navbar-expand-lg .navbar-nav .nav-link > .fa > .badge {
				    top: -7px;
				  }
				}

				@media (min-width: 1200px) {
				  .navbar-icon-top.navbar-expand-xl .navbar-nav .nav-link {
				    text-align: center;
				    display: table-cell;
				    height: 70px;
				    vertical-align: middle;
				    padding-top: 0;
				    padding-bottom: 0;
				  }

				  .navbar-icon-top.navbar-expand-xl .navbar-nav .nav-link > .fa {
				    display: block;
				    width: 48px;
				    margin: 2px auto 4px auto;
				    top: 0;
				    line-height: 24px;
				  }

				  .navbar-icon-top.navbar-expand-xl .navbar-nav .nav-link > .fa > .badge {
				    top: -7px;
				  }
				}

				.show{ display: block; }

				/* Parte do input search */
				.container-2 input#search {
					width: 17em;
					height: 26px;
					background-color: #2b303b;
					border: none;
					font-size: 10pt;
					float: left;
					color: #262626;
					border-radius: 5px;
					color: #fff;
					-webkit-transition: width .55s ease;
					-moz-transition: width .55s ease;
					-ms-transition: width .55s ease;
					-o-transition: width .55s ease;
					transition: width .55s ease;
					padding-left: 15px;
				}

				.container-2 .icon {
					color: #4f5b66;
					left: 0;
					margin-left: 19px;
					cursor: pointer;
					z-index: 1;
					
				}
				.box {
					height: 29px;
					position: relative;
				}
			`);
		},

	}