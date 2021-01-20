
	signup = {
		abs:'2<-1',
		construct: ()=>{
			window['field_pass'] = 1;
			
		},
		title: 'Cadastrar - ',
		
		template: (value)=>{
		//	setTimeout(()=>{
			//2	$('.container').fadeIn(1000);
			//2	$('.loader').fadeOut(1500).remove();
			//2	$scope.signup.open_field();
		//	},Math.floor(Math.random()*2000)+800);
		//	document.title = 'Cadastrar - algo.com';
			
			return new Promise( function(resolve){
				resolve(
				$t('div',{id:'res_modal'})+
					$t2('div', {},
						$t2('div', {class: 'jumbotron', id: 'form', style: 'box-shadow: 3px 4px 73px darkgray;'},
							$t2('h1', {class: '', style: '', id: 'h1log'},'Cadastrar Conta:')+

							$t2('label', {class: 'badge badge-secondary', for: 'btn_nome'},'Nome' )+
							$t1('input', {class: 'form-control', name: 'btn_nome', placeholder: 'Write Your Nome', id: 'btn_nome', type: 'text'}, '')+

							$t2('label', {class: 'badge badge-secondary', for: 'btn_email'}, 'Email')+

							
							$t1('input', {class: 'form-control', name: 'btn_email', placeholder: 'Write Your Email', id: 'btn_email', type: 'text'},'')+

							$t('div',{},
								$t2('label', {class: 'badge badge-secondary', for: 'btn_country'}, 'País:')+

								$t('select',{class:'form-control', id:'sel_country'},
									$t('option',{class:'form-control'},
										'---------'
									)
									+$t('option',{class:'form-control'},
										'Venezuela'
									)
								)
							)+
							$t('div',{},
								$t2('label', {class: 'badge badge-secondary', for: 'btn_state'}, 'Estado:')+

								$t('select',{class:'form-control', id:'btn_state'},
									$t('option',{class:'form-control'},
										'---------'
									)
								)
							)+
							$t('div',{},
								$t2('label', {class: 'badge badge-secondary', for: 'btn_city'}, 'City:')+

								$t('select',{class:'form-control', id:'btn_city'},
									$t('option',{class:'form-control'},
										'---------'
									)
								)
							)+


							$t2('label', {class: 'badge badge-secondary', for: 'pass_0'},'Senha:')+
							$t2('div', {id: 'box_field'},
								$t2('button', {class: 'btn btn-secondary', onclick: '$scope.signup.more_one()'},
									'+')+
								$t2('button', {class: 'btn btn-secondary', onclick: '$scope.signup.minus_one()'},
									'-')+
								$t1('input', {id: 'pass_result', type: 'hidden'},
									'')+
								$t2('label', {class: 'badge badge-secondary', id: 'row_pass'})
							)+
							$t1('input', {type: 'hidden', name: 'csrf', value: value},
								''
							)+
							$t2('button', {class: 'btn-warning', id: 'btn_change', onclick: '$scope.signup.see_pass()', style: 'margin: 4px;'},'Mostrar Senha')+
							$t1('br')+
							$t2('label', {class: 'badge badge-info'}, 'Sexo')+
							$t1('br')+
							$t1('input', {name: 'sexo', id:"masc", checked: 'checked',value: 0 , type: 'radio'},
								$t2('label', {class: 'badge badge-secondary', for: 'masc'}, 'Masculino', 'masc') 
							)+

							$t1('input', {name: 'sexo', id:"fem",value: 1, type: 'radio'},
								$t2('label', {class: 'badge badge-secondary', for: 'fem'}, 'Feminino')
							)+



							$t2('button', {class: 'btn btn-success btn-block', style: 'margin: 4px;', onclick: '$scope.signup.cadastrar()'}, 'Aceitar')+
							$t2('a', {href:'#/login', class: 'badge badge-pill badge-dark mt-3 pt-1 cp', style: 'margin: 4px;', offclick: '$html( "body", $component({name: "login_", history: true, async: false, href: "/base"}, $("input[name=csrf]").val(), "body" ) )'}, 
								$t2('h2', {},'Fazer Login') 
							)
						/*	+$t2('div', {id: 'saida'},
								''
							)
						*/
						)
					)
				)
						
			});
		},
		onclose: function(){
			$('#sel_country').off();
			$('#btn_state').off();
			$("#btn_city").off();

		},
		end_load: function(){
			$('#sel_country').on('change', function(res){
				var results = $.getJSON("json_venezuelacity.json", function(data) {
				//	let aut = [];

					let aa = $t('option',{value:0},'-----');

					var aux = [];
					for(var i = 0; i < data.length; i++) {
						if( typeof aux[data[i].admin_name] =='undefined' ){
						//	aux.push( data[i].admin_name );
						//	aux.push( {admin_name: data[i].admin_name } );
							aux[data[i].admin_name ] = 1;
						//7	$("#btn_state").append('<option value="' + data[i].admin_name + '">' + data[i].admin_name + '</option');
							aa+= $t('option',{value:data[i].admin_name},data[i].admin_name);

						}else{

						}
						
					}
					$html('#btn_state', aa);

				//	vv(data,'data PPP');

				//	return;
					/*
					data = data.filter((v, x)=>{
					//	vv(x,'x do signup')
						
						return v.country =='Venezuela' && v.indexOf(item) == pos ;
					});
					*/


					/*
					var uniqueNames = [];
					$.each(data, function(i, el){
					    if($.inArray(el.subcountry, uniqueNames) === -1) uniqueNames.push(el);
					});

					data = uniqueNames;
					*/

				//	vv(data,'main_login');

					/*
					for(var i = 0; i < data.length; i++) {
						$("#btn_state").append('<option value="' + data[i].geonameid + '">' + data[i].subcountry + '</option');
						
					}
					*/

					$('#btn_state').on('change', function(ress){
						let aux = $('#btn_state option:selected').text();
						vv(data,'data PPP');

						ress = data.filter((v, x)=>{
							return v.admin_name ==aux;
						});
						vv(ress,'main_login');
						let uu = $t('option',{value:0},'-----');
						for(var i = 0; i < ress.length; i++) {
						//	$("#btn_city").append('<option value="' + ress[i].admin_name + '">' + ress[i].admin_name + '</option');
							uu+= $t('option',{value:ress[i].city},ress[i].city);
							
						}
						$html('#btn_city', uu);
					});

				});
			});
		},
		cadastrar: ()=>{
			if(field_pass==0){
				toast('Crie pelo menos um campo de senha','#saida','',2);
			//5	return;
			}
			if($scope.signup.att_pass()==false){
				toast('Há Campos em Branco','#saida','',2);
			//5	return;
			}
			const btn_nome = $('#btn_nome').val();
			const btn_pass_two = $('#btn_pass_two').val();
			const btn_email = $('#btn_email').val();
		//	const btn_email = att_pass();
			const btn_pass = $scope.signup.att_pass();
			btn_pass_geral = btn_pass;
			field_pass = 0;
		//	const btn_pass = $('#btn_pass').val();
			const sexo = $("input[type='radio']:checked",'#form').val();
			const csrf = $('input[name=csrf]').val(); 
			
			$('#box_field').attr('id','box_fieldd').empty();

			$html('#res_modal',
			//	$template('modal_password','aa')
				$scope.signup.modal_password()
			);
			return;

		},
		cadastro_confirm: ()=>{
			const btn_pass = $scope.signup.att_pass();
			console.log(btn_pass)
			console.log(btn_pass_geral)
			if (btn_pass == btn_pass_geral){
				const btn_nome = $('#btn_nome').val();
				const btn_pass_two = $('#btn_pass_two').val();
				const btn_email = $('#btn_email').val();
				const sexo = $("input[type='radio']:checked",'#form').val();
				const csrf = $('input[name=csrf]').val(); 

				const state = $('#btn_state option:selected').text();
				const city = $('#btn_city option:selected').text();

				$.post('/base/cadastrar',{email: btn_email, pass: btn_pass, sexo: sexo, nome: btn_nome, pass_two: btn_pass_two, csrf: csrf, city:city, state:state},function(data){
					const result = JSON.parse(data);

					switch(true){
						case result['code']==0:
							$('input[name=csrf]').val(result['validate']);
							toast(result['message'],'#saida',0);
						break;
						case result['code']==1:
							toast(result['message'],'#saida',1);
							$router.go('#/login');
							/*
							setTimeout(()=>{
								window.location.href = '/base';
							},1200);
							*/
						break;
						case result['code']==2:

						break;
						case result['code']==3:
							$('input[name=csrf]').val(result['validate']);
							toast(result['message'],'#saida',2);
						break;
					}


				});
				console.log('igual')
			}else{
				toast('Senha Não Confere','#saida',2);

			}
		},
		modal_password: (data)=>{ 
		//	return;
		//	data.valor = (data.valor==undefined) ?  ('') : (data.valor);
			setTimeout(()=>{
				//  $('.modal').show(1000)
				$('.modal').modal('show', 1000);
				//  $('.exampleModal').modal('show');

				$(".modal").on("hidden.bs.modal", function () {
					// put your default event here
					console.log('fechando')
					$('#box_field2').attr('id','box_field');
					$('#box_fieldd').attr('id','box_field').append( 
						$t2('button', {class: 'btn btn-secondary', onclick: '$scope.signup.more_one()'},
							'+'
						)+
						$t2('button', {class: 'btn btn-secondary', onclick: '$scope.signup.minus_one()'},
							'-'
						)+
						$t1('input', {id: 'pass_result', type: 'hidden'})+
						$t2('label', {class: 'badge badge-secondary', id: 'row_pass'})
					)

					setTimeout(()=>{
						$(".modal").off()
						$('.modal').remove();
						delete modal_password;
						field_pass = 0;
					//	eval(' delete modal_password; ');
					},1000)

				});
			},1000)
			return(
				$t2('div', { "class":"modal fade bd-example-modal-lg hide","tabindex":"-1","role":"dialog","aria-labelledby":"myLargeModalLabel","style":"" },
					$t2('div', { "id":"saida3" })+
					$t2('div', { "class":"modal-dialog modal-lg",style: 'min-width: 98%;' },
						$t2('div', { "class":"modal-content" },
							$t2('div', { "class":"modal-header" },
								$t2('h1', { "class":"modal-title","id":"exampleModalLongTitle" },'Confirme Sua Senha'
								)
								
							)+
							$t2('div', { "class":"modal-body" },
								$t2('div', {id: 'box_field'},
									$t2('button',{class: 'btn btn-secondary', onclick: '$scope.signup.more_one()'},
										'+'
									)+
									$t2('button',{class: 'btn btn-secondary', onclick: '$scope.signup.minus_one()'},
										'-'
									)+
									$t1('input', {id: 'pass_result', type: 'hidden'})+
									$t2('label', {class: 'badge badge-secondary', id: 'row_pass'}
									)
								)
								+$t2('button',{class:'btn btn-success',onclick:'$scope.signup.cadastro_confirm()'},'Confirmar Senha')
							)+
							//run_script(()=>{ delete modal_anuncio;},200)
							$t2('div', { "class":"modal-footer" },
								$t2('button', { "type":"button","class":"btn btn-secondary","data-dismiss":"modal", onclick: '' },'Close'
								)
							)
							+$t2('div', {id:'saida'})
						)
					)
				)
			)
		},
		open_field: ()=>{
			var txt = '';
			for(var i =0; i< field_pass;i++){
				txt += $component('password_',i)
			}
			$('#box_field').append( txt );
			$('#row_pass').html( $t2('h2', {},'Total de Linhas: '+field_pass+'.'))
		},
		more_one: (val='')=>{
			if(field_pass!=4){
				$('#box_field').append( $component('password_',field_pass) )
				$scope.signup.increment_pass();
				$('#row_pass').html( $t2('h2', {},'Total de Linhas: '+field_pass+'.'))
			}	
		},
		minus_one: (val='')=>{
			if(field_pass!=0){
				let temp = field_pass-1;
				$('#field'+temp).remove();
				$scope.signup.decrement_pass();
				$('#row_pass').html( $t2('h2', {},'Total de Linhas: '+field_pass+'.'));
			}	
		},
		increment_pass:()=>{
			field_pass = field_pass +1;
			return '';
			
		},
		decrement_pass:()=>{
			field_pass = field_pass -1;
			return '';
		},

		att_pass:()=>{
			var tss ='';
			for(var i = 0; i<field_pass;i++){
				if($('#pass_'+i).val()==''){
					return false;
				}
				tss += $('#pass_'+i).val()+i;

			}
			tss = sha512(tss);
			return tss;
		//	$('#pass_result').val(tss);
		},

		loading_on:()=>{
			$('.container').before($t2('div', {class: 'loader'}));
		//	$('.loader').show().css('opacity','0.5').fadeOut();
		},

		loading_off:()=>{
		//	$('.container').fadeIn(100)
			$('.loader').fadeIn(750).remove();
		},
		see_pass: ()=>{
			for(var i = 0; i<field_pass;i++){
				if( $('#pass_'+i).attr('type')=='password' ){
					$('#pass_'+i).attr('type', 'text');
				}else{
					$('#pass_'+i).attr('type', 'password');
				}
			}
			if( $('#btn_change').attr('class')=='btn-warning' ){
				$('#btn_change').attr('class','btn-success')
				$('#btn_change').html('Ocultar Senha')
			}else{
				$('#btn_change').attr('class','btn-warning')
				$('#btn_change').html('Mostrar Senhas')

			}
		}
	}