
	<!-- <script src="/assets/js/lib/alasql_0-5-5.js"></script> -->


<script>
//	(function(win, doc){
		setTimeout(()=>{
	//	$(doc).ready(()=>{
			database = {
				name: 'agendaphp',
				version: 2,
				obj:{
					user:{
						val: {
							keyPath: 'id_user', autoIncrement:true
						},
						index:[
						//	['id_user', 'id_user',{unique: true, multiEntry: true}],
							['pass','pass',  {unique: false  }],
							['email','email',{unique: true  }]
						]
					},
					agenda:{
						val: {
							keyPath: 'id_agenda', autoIncrement:true
						},
						index:[
						//	['id_user', 'id_user',{unique: true  }],
							['titulo','titulo',  {unique: false  }],
							['txt_agenda','txt_agenda',{unique: false  }]
						]
					},
					logged:{
						val:{
							keyPath: ['id_log','email']
						},
						index:[
						//	['id_log','id_log',{unique: true  }]
						//	['islog','islog',{	unique: false  }],
							['email','email',{unique: true, multiEntry: true }]

						]
					},
					pontos:{
						val:{
							keyPath: ['own', 'date_']//, autoIncrement: true
						},
						index:[
							['date_','date_',{unique: false  }],
							['own','own',{unique: false  }],
							['positivo','positivo',{unique: false  }],
							['negativo','negativo',{unique: false  }]

						]
					}
				}
			}
//	 O atributo multiEntry permite filtrar os valores individuais de uma matriz. Por esse motivo, o atributo multiEntry só é útil quando o índice é colocado em uma propriedade que contém uma matriz como valor.
//	Quando o atributo multiEntry estiver em true, haverá um registro adicionado para cada valor na matriz. A chave deste registro será o valor do array e o valor será o objeto que mantém o array. Como os valores na matriz são usados ​​como chave, significa que os valores dentro da matriz precisam ser chaves válidas . Isso significa que eles podem ser apenas dos seguintes tipos:

			_get_db('agendaphp').then((db)=>{
				db.close();
			//	vv('then do _pindexeddb');
				get_value_db('logged', {id_log: 1 }).then((res)=>{
				//	vv(res,'home.php')
					if(res.length==0){
					//	$component({name:'main_login',promise:true},{}, '#main_section').then((res)=>{
						$component({name:'main', src: '/components/main_login.js',promise:true},{}, '#main_section').then((res)=>{
						//	vv(res,'home')
							$html('body',res);
							$scope.main.end();
						});
						
					}else{
						$component({name:'main',promise:true},{}, '#main_section').then((res)=>{
						//	vv(res,'home')
							$html('body',res);
							$scope.main.end();
						});
					}
				//	vv(res,'res do logged')
				});
			}).catch((err)=>{
				vv(err,'erro in _pindexeddb');
				
			});
		},1000);
	//	});
//	})(window, document);

</script>