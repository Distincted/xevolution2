

	login_ = {
		abs: '2<-1',
		title:'Logar',

		construct: ()=>{
		//	window['field_pass'] = 1;
		},
		field_pass: 1,
		card( title='', val='', id='id vazio'){
			return(
				$t('div',{class:'col p-4', id:'r_'+id},
					
					$t('h1',{class:'display-4'},'')
					+$t('div',{class:'card'},
						$t('h5',{class:'card-header font-weight-light'},
							$t('label',{id:''}, title)
							+$t1('img',{src:'/assets/img/delete.png',style:'float:right;',class:'cp ml-2', onclick: '$scope.login_.delete('+id+');'})
							+$t1('img',{src:'/assets/img/edit.png',style:'float:right;',class:'cp ', onclick: '$scope.login_.edit('+id+');'})
						)
						
						+$t('div',{class:'card-body'},
							
							$rtext(val)
							
						)
					)
				)
			);
		},
		create(){
			if($('#exit_agenda').html() =='' ){
				$html('#exit_agenda',
					$t('div',{class:'card',style:'margin:5px; margin: 5px; border: 1px solid black;box-shadow: -1px 0px 6px darkcyan; padding: 8px; '},
						$t('label',{for:'input_titulo'},'Título:')
						+$t1('input',{class:'form-control', id:'input_titulo',placeholder:'Título'})
						+$t('label',{for:'txt_id'},'Texto:')
						+$t('textarea',{class:'form-control', id:'txt_id', placeholder:'Digite um Texto', onkeyup:'$scope.login_.autoResize(this); ',style:'min-height:70px;'})
						+$t('button',{class:'btn btn-success ', onclick: '$scope.login_.save(this);'},'Salvar')
						+$t('button',{class:'btn btn-danger mt-3', onclick:'$scope.login_.create();'},'Cancelar')
					)
				);
				$scope.login_.autoResize( $('#txt_id')[0] );
				$('#input_titulo').focus().select();

			}else{
				$.when(
					$('#exit_agenda').fadeOut(300)
				).done(function(){
					$html('#exit_agenda','');
				});
				
			}
		},
		save(thiss){
			thiss.disabled = true;
			let titulo = $('#input_titulo').val();
			let txt_agenda = $('#txt_id').val();
			if(titulo.trim()=='' && txt_agenda.trim() == ''){
				setTimeout(()=>{
					thiss.disabled = false;

				},300);
				toast('Titulo e Mensagem Vazios', '#exit_agenda', 4, 2);
				return;
			}
			set_values_db('agenda',{titulo: titulo, txt_agenda: txt_agenda }).then((res)=>{
				thiss.disabled = false;
				vv(res,' save login_.js');
				$prepend('#agenda_show',
					$scope.login_.card( res[0].titulo, res[0].txt_agenda, res[0].id_agenda )
				);
				$scope.login_.create();

				setTimeout(()=>{
					toast('Cadastrado Com Sucesso', 'body', 1, 2);

				},100)


			}).catch((res)=>{
				thiss.disabled = false;
				toast('Houve Um Problema', '#exit_agenda', 0, 2);

			});

		},
		edit(idd){
			$html('#r_'+idd,
				$t('div',{class:'card',style:'padding:8px;'},
					$t('label',{for:'input_titulo'},'Título:')
					+$t1('input',{ placeholder:'Título', class:'form-control', id:'input_titulo_'+idd, value: $('#r_'+idd+' div h5 label').html() })
					+$t('label',{for:'txt_id'},'Texto:')
					+$t('textarea',{class:'form-control', placeholder: 'Digite um Texto', id:'txt_id_'+idd, onkeyup: `$scope.login_.autoResize(this);`}, $('#r_'+idd+' div div').html() )
					+$t('button',{class:'btn btn-success mt-2', onclick: '$scope.login_.save_edit(this, '+idd+');'},'Salvar')

					+$t('button',{class:'btn btn-danger mt-1', onclick:`(function(){
						$("#r_${idd}").replaceWith(function(){
							return $scope.login_.card( 
								$("#input_titulo_${idd}").val()||"", 
								$("#txt_id_${idd}").val()||"", 
								${idd} 
							) 
						})
					})()`},'Cancelar')
				)
			);
		//	setTimeout(()=>{
			$scope.login_.autoResize( $('#txt_id_'+idd)[0] );	
			$('#r_'+idd+' div input').focus();

		//	},300 );
		},
		save_edit(thiss, idd){
			thiss.disabled = true;

								
			update_db('agenda', {titulo: $("#input_titulo_"+idd).val()||"", txt_agenda:$("#txt_id_"+idd).val()||"", id_agenda: idd }, {id_agenda: idd} ).then((res)=>{
				toast('Atualizado Com Sucesso', '#exit_agenda', 1, 2);
				$("#r_"+idd).replaceWith(function(){
					return $scope.login_.card( 
						$("#input_titulo_"+idd).val()||"", 
						$("#txt_id_"+idd).val()||"", 
						idd 
					) 
				});
			}).catch((err)=>{
				toast('Houve Um Problema', '#exit_agenda', 0, 2);
				thiss.disabled = false;

			});
		},
		delete(idd){
			if( !confirm('Tem Certeza Que Quer APAGAR Esse Card?')){
				return false;
			}
			remove_db('agenda',idd).then((res)=>{
				$removeFade('#r_'+idd);
				toast('Deletado Com Sucesso', '#exit_agenda', 1, 2);

			}).catch((res)=>{
				toast('Houve Um Problema', '#exit_agenda', 0, 2);

			});
		},
		autoResize: function(tx){
			//	https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
			tx.style.height = 'auto';
             
            tx.style.height = 
            (tx.scrollHeight) + 'px';

			return;
			
		},
		template: (db_values)=>{
		//	setTimeout(()=>{
			//2	$('.container').fadeIn(1000);
			//2	$('.loader').fadeOut(1500).remove();
			//2	$scope.login_.open_field();
		//	},400);
		//	document.title = 'Login - algo.com';

		//	vv(value,'template login_.js'); debug = value;
			return new Promise((resolve, reject)=>{
				resolve(
					$t('div',{class:'card'},
						$t('h1',{style:'text-align:center; background: deepskyblue; color: yellow;'},'Agenda Rápida')
						+$t('div',{id:'agenda_show'},
						//	$t('span',{id:'show_agenda'},'asdfsd')

							$for_order((v)=>{
								return(
									$scope.login_.card(v.titulo, v.txt_agenda, v.id_agenda )
								);
							}, db_values, 'DESC' )
						//	+$t('button',{class:'btn btn-info', onclick:'$scope.login_.edit();'},'Editar')
							+$t('button',{class:'btn btn-primary ml-2', onclick:'$scope.login_.create();'},'Criar')
							+$t('div',{id:'exit_agenda'})
						)
					)+
					$t2('div',{id:'result'})+ // adicionei agora nao sei se serve
					$t2('div', {class: 'jumbotron'},
						$t2('h1',{class: '', style: '', id: 'h1log'}, 'Login:')+

						$t2('label', {class: 'badge badge-secondary', for: 'btn_email'},'Email')+

						$t1('input', {class: 'form-control', name: 'btn_email', placeholder: 'Write Your Email', id: 'btn_email', type: 'text'},'')+
						$t2('label',  {class: 'badge badge-secondary', for: 'pass_0'}, 'Senha:')+

						$t2('div', {id: 'box_field'},
							$t2('button', {class: 'btn btn-secondary', onclick: '$scope.login_.more_one()'},
								'+'
							)+
							$t2('button', {class: 'btn btn-secondary', onclick: '$scope.login_.minus_one()'},
								'-'
							)+
							$t2('label', {class: 'badge badge-secondary', id: 'row_pass'},
								''
							)
						)+
						$t2('button', {class: 'btn-warning', id: 'btn_change', onclick: '$scope.login_.see_pass()'},'Mostrar Senha')+
						/*
						$t1('input', {class: 'form-control', placeholder: 'Write Your Password', id: 'btn_pass', type: 'password'},'')+
						*/
						
						$t2('button', {class: 'btn btn-success btn-block', style: 'margin: 4px;', onclick: '$scope.login_.log_in(this)'}, 'Aceitar')+
						
					//	$t1('input', { type: 'hidden', name: 'csrf', value: value})+
						$t2('a', {class: 'badge badge-pill badge-dark mt-3 pt-1 cp', href:'#/signup'},
							$t2('h2', {},'Cadastrar')
						)
						+$t2('div', {id: 'saida'},'')
						+$t2('button', {class: 'add-button'},'add PWA')
						+$t2('button', {onclick: '$scope.login_.remove_pwa()'},'remove PWA')
					)
				
				);
			});
		},
		open_field: ()=>{
			var txt = '';
			for(var i =0; i< $scope.login_.field_pass;i++){
			//	txt += $component('password_',i)
				txt += $scope.password_.template(i);
			}
			$('#box_field').append( txt );
			$('#row_pass').html( $t2('h2', {},'Total de Linhas: '+$scope.login_.field_pass+'.'))
		},
		more_one: (val='')=>{
			if($scope.login_.field_pass!=4){
				$('#box_field').append( 
					$scope.password_.template( $scope.login_.field_pass ) 

				);
				$scope.login_.increment_pass();
				$('#row_pass').html( $t2('h2', {},'Total de Linhas: '+$scope.login_.field_pass+'.'))
			}	
		},
		minus_one: (val='')=>{
			if($scope.login_.field_pass!=0){
				let temp = $scope.login_.field_pass-1;
				$('#field'+temp).remove();
				$scope.login_.decrement_pass();
				$('#row_pass').html( $t2('h2', {},'Total de Linhas: '+$scope.login_.field_pass+'.'));
			}	
		},
		increment_pass:()=>{
			$scope.login_.field_pass = $scope.login_.field_pass +1;
			return '';
			
		},
		decrement_pass:()=>{
			$scope.login_.field_pass = $scope.login_.field_pass -1;
			return '';
		},

		att_pass:()=>{
			var tss ='';
			for(var i = 0; i<$scope.login_.field_pass;i++){
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

		log_in:(thiss)=>{
			thiss.disabled = true;
			$scope.login_.loading_on();
			function ends(){
				setTimeout(()=>{
					$removeFade('.loader');
					thiss.disabled = false;
				},1000);
			}
			if($scope.login_.field_pass==0){
				toast('Crie pelo menos um campo de senha','#saida',2);
				ends();
				return;
			}
			if($scope.login_.att_pass()==false){
				toast('Há Campos em Branco','#saida' ,2);
				ends();
				return;
			}
		//	const btn_email = ;
		//	const btn_pass = $('#btn_pass').val();
			
			const btn_email = $('#btn_email').val();
			const btn_pass = $scope.login_.att_pass();
			const csrf = $('input[name=csrf]').val(); 

			get_value_db('user',{email: btn_email }).then((res)=>{
				get_value_db('logged',{email: btn_email }).then((dbs)=>{
			//	vv(res,'kkkk');
			//	vv(btn_pass, 'btn_pass');

				if( res.length > 0 ){
			//	if(typeof res.length == 0){
					if(res[0].pass!=btn_pass ){
						toast('Senha Errada', '#saida', 0);
						ends();
						return;
					}
				}
				
			//	return;
				if( res.length > 0 ){
					toast('Logando ','#saida', 1);
				//	ends();
				//	$router.close();
					if( Object.keys(dbs).length ==0 ){
						set_values_db('logged',{ email: btn_email }).then((key_path)=>{
						//	vv(key_path,'resposta do logged')

							setTimeout(()=>{
								$component({name:'main'}).then((res)=>{
								//	vv(res,'login_.js')
									$html('body',res);
									$scope.main.end( btn_email );
								//??	$scope.main.key = key_path;
								});

							},2500);
						});

					}else{
						update_db('logged',{ email: btn_email, id_log: dbs.id_log }).then((key_path)=>{
						//	vv(key_path,'resposta do logged')

							setTimeout(()=>{
								$component({name:'main'}).then((res)=>{
								//	vv(res,'login_.js')
									$html('body',res);
									$scope.main.end( btn_email );
								//??	$scope.main.key = key_path;
								});

							},2500);
						});
					}

				}else{
					toast('Testando','#saida', 1);
					if(!confirm('Quer cadastrar um novo usuario?') ){
						ends();
						return;

					}
					set_values_db('user',{email: btn_email, pass: btn_pass }).then((res)=>{
					//	vv(res,'login_.js');
						if( Object.keys( res ).length > 0){

							toast('Cadastrado','#saida', 1);
						//	ends();
						//	$router.close();
							set_values_db('logged',{ email: btn_email }).then((res)=>{


								setTimeout(()=>{
									$component({name:'main'}).then((res)=>{
										$html('body',res);
										$scope.main.end( btn_email );

									});

								},1500);
							});

						}else{
							toast('Houve Um Problema no Cadastro','#saida',2);
						//	$router.close();
						//	ends();
						/*
							setTimeout(()=>{
								$component({name:'main'}).then((res)=>{
									$html('body',res);
									$scope.main.end();
								});

							},1500);
						*/
						}
					});

				}	
			});
			});
				

		},
		see_pass: ()=>{
			for(var i = 0; i<$scope.login_.field_pass;i++){
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