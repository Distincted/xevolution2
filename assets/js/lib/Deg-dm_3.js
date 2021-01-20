/*
*	versao 3.0.7304
* att 12/01/2021
* since 20/09/2019
* fim do $router.close Novo $html() |mudado scriptSRC styleSRC	 reformulado $component
* add $remove_func([],'')	removido arrow functions
*/


var base_url_be=null;
const src = 'assets/js/templates/';
const integrity_actived = false;
//const cache = false;

var isDev = false;

var $scope = {};

const faa = function(arrai={} ){
	// private function array assoc of atrribute
	let aux = "";
	if(Object.keys(arrai).length>0){
		for (let key in arrai) {
			aux +=" "+key +"='"+ arrai[key] +"'";
		}
		//	aux +=''+key +'=\"'+ arrai[key] +'\"';
	}
	return aux;
};

var $br_r = "";
var $br_tab = "";
if(isDev){
//3	$br_r = " \r \t";
//3	$br_tab = " \t ";
	$br_r = "";
	$br_tab = "";
}else{
	$br_r = "";
	$br_tab = "";
}


const $delete = function(name_func){
	let au;
	try{
		if(name_func.indexOf(",")!=-1){
			var aux = name_func.split(",");
			for( let au in aux){
				let temp = aux[au].trim();
				delete window[temp];
			}
		}else{
			delete window[name_func];
		}
		return'';
	}catch(e){
		return 'error';
	}
};

function $ry(func=function(){}){
	func(); return'';
}

function $exec(func=function(){} ){
	return func();
}

function var_create(name='', value=''){
	if(name!=''){
		window[name] = value;
	}
	return'';
}

function var_get(name=''){
	if(name!=''){
		return window[name];
	}
}
function var_set(name='',value=''){
	if(name!=''){
		window[name] = value;
		return '';
	}
}

var $router = {
	go(val, hash={hash:true}){
		if(hash.hash){
			window.location.hash = val;
		}else{
			window.location.href = val;
		}
	},
	run( $func, others = null){
		if(typeof $router_config =='undefined'){
			let urll = window.location.href;
			$router_config = function( param2 ){
				let _url = window.location.href;

				if( $router.getParams( _url ).length ==0 ){
					let val = window.location.hash;
					if( val.indexOf("?")){
						val = val.split("?")[0];
					}
				//	vv('111')
					$func( val, null, param2 );
				}else{
				
					let params =  $router.getParams( _url );
				//	vv( params, 'params getParams3' )
					let val = window.location.hash;
					if( val.indexOf("?")){
						val = val.split("?")[0];
					}
				//	vv('222')
					$func( val, params, param2 );
				}
				
			};
			/*
			if( this.getParams( urll ).length ==0 ){
				let val = window.location.hash;
				if( val.indexOf("?")){
					val = val.split("?")[0];
				}

				$func( val, null  );

			}else{
				let val = window.location.hash;
				if( val.indexOf("?")){
					val = val.split("?")[0];
				}

				let params = this.getParams( urll );
			//	vv( params, 'params getParams4' )	

				$func( val, params, others );
			}
			*/
			$router_config();
			
			window.addEventListener('hashchange', $router_config);
		}
	},
	getParams(url = window.location.href ){
		
		let arr = [];
		if(url.indexOf('?')!=-1){
			var ary = url.split('?')[1].split('&');
			let ax={};
			let va = ary[0].split('=');
			$for(function(v){
				let u = v.split('=');
				ax[u[0]] = u[1];
			},ary);
			return ax;
		}
		return arr;
	},
	reload( args){
		$router_config(args);
	},
	close(){
		if(typeof $router_config =='undefined'){
			return;
		}
		window.removeEventListener('hashchange',  $router_config);
		delete window['$router_config'];
	}
}

function $start_comp(locate=''){
	if(locate==''){return;}
	$(locate).html(
		$t2('div', {class: 'loader',style: 'text-align: center;'})
	)
	$('.loader').show(400);
}

function $end_comp(val=null){
	if(val==null){
		$('.loader').hide(400).remove();
	}else{
		$.when(
			$(val).hide(400)
		).done(function(){
			$(val).remove()
		});
		
	}
}

const $remove_component = function(val){

	if( typeof val =='string'){
		$for(function(data, increment){
			if(increment==val){
				if( typeof $scope[val].onclose != 'undefined'){
					$scope[val].onclose();
				}
				$('#abs_'+val).remove();
				delete $scope[val];

			}
		}, $scope);
	}else if( typeof val == 'object'){
		$for(function(dats){
			$for(function(data, increment){
				if(increment==dats){
					if( typeof $scope[val].onclose != 'undefined'){
						$scope[val].onclose();
					}
					$('#abs_'+data.abs).remove();
					delete $scope[increment];

				}
			}, $scope);
		}, val);

	}
	return '';

}
function $remove_func(del_name=[], name_comp=''){

//	var del_name = ['template']
//	var name_comp = 'main';
	$for((val, key)=>{
		if( del_name.includes(key) ){
		//	vv('deletando '+key);
			delete $scope[name_comp][key]
		}
	}, $scope[name_comp] );

}

function $modules( arr=[] ){
	return new Promise((resolve, reject)=>{
		function _aux(){
			$component(arr[count]).then((res)=>{
			//0	$remove_component( arr[count]);
				count++;
				if( count > a){
					resolve('ok')
				}else{			
					_aux();
				}
			})
		}
		let a = arr.length-1;
		let count = 0;
		_aux();
	});
}

const $extend = function(param, name_func=[], target, newname=null ){
	 // select from component 'perfil' function= 'wait, responder' and parse in 'home'
	let padrao = {
				async: true, 	promise: true
	};
	if(typeof param =='string'){
		padrao['name'] = param;
		padrao['src'] = '/components/'+param+".js";
	}else if(typeof param=='object'){
		padrao['name'] = param.name;
		padrao['src'] = '/components/'+param.name+".js";
		padrao = Object.assign( padrao, param);
	}
	let result;
	let pega = true;
	let tests;
	let name = padrao.name;
	try{
		$.ajax({
			url: padrao.src,
			type: 'GET',
			async: padrao.async,
			cache: (isDev?false:true), // PARA DEV
			timeout: 3000,
			dataType: 'text',
			error: function(){	
				console.log('Error in Ajax'); 
				return false;
			},
			success: function(data){
				result = data;
				let tests = eval(result);
				$delete( name );

				let arr={};
				if( name_func.length>0 ){
					$for( function(val, key){
						$for( function(r){
							if(key== r ){
							//7	arr[r] = val;
								arr[r] = val.bind($scope[target]);
							}
						},name_func);
					},tests);
				
				}else{
					let nf=	['abs','template','onclose','after','construct','style','styleSRC','scriptSRC','handler','title'];
					$for( function(val, key){
						$for( function(r){
							if(key== r ){
								delete tests[r];		
							}
						},nf);
					},tests);
					
					arr = tests;
				}
				/* fazer depois aqui
				if(newname!=null){
					let ar = [];
					$for(function(val,key){
						$for(function(v2, k2){

						},newname)
					},arr)
				}
				*/
			//	vv(target,'deg-dm.js ')
				if( typeof $scope[target] == 'undefined'){
					$scope[target] = arr;
				}else{
					Object.assign( $scope[target], arr );

				}
			}
		});
	}catch(err){
	//	vv(err,'error in request_sync');
		return false;
	}		
}

const $component = function(param, value='', locate='', others=null){
//	window.document.clear();
//	window.document.close();
	$start_comp(locate);

	let padrao = {
			async: true,	promise: true
	};
	if(typeof param =='string'){
		padrao['name'] = param;
		padrao['src'] = '/components/'+param+".js";
		padrao['href'] = param;
	}else if(typeof param=='object'){
		padrao['name'] = param.name;
		padrao['src'] = '/components/'+param.name+".js";
		padrao['href'] = param.name;
		padrao = Object.assign( padrao, param);
	}
	let name = padrao.name;
	if( typeof $scope[name] != 'undefined' ){
		if( typeof $scope[name].template != 'undefined' ){

			if(padrao.async==true){
				/* 77
				$html(locate,
					$scope[name].template( value )
				);
				*/
			//	if(padrao.history==true){
				//	_save_history({padrao: padrao, value: value, locate: locate}, padrao.href );
			//	}
			//	return;
			}
			try{
				$end_comp();
				if( padrao.promise == true){
					return new Promise((resolve, reject)=>{
						resolve(
							$scope[name].template( value, others )
						);
					});
				}else{
					return $scope[name].template( value, others );

				}
			}catch(err){
				throw(err);
				return '';
			}
		}
	}
	var result;
	var ok_name = null;	
	for( let spe in $scope){
		if(spe==name){
			ok_name = spe;
			break;
		}
	}
	if(ok_name!=null){
		ok_name= null;
		return;
	}else{
	//	if(padrao.history==true){
		//	_save_history({padrao: padrao, value: value, locate: locate}, padrao.href );
	//	}
		$start_comp(locate);
		function core(test, padrao,  locate='' ){
			function remove_parent(arr){
				$for(function(val, key){
					$for(function(vallue, increment){
						if(vallue.abs.indexOf('<-')!=-1){
							var varc = vallue.abs.split('<-');
							if(varc[0]==val){
								$('.abs_'+varc[0]).remove();
								if(  typeof $scope[increment].onclose != 'undefined' ){
									$scope[increment].onclose();
								}
								if(  typeof $scope[increment].handler != 'undefined' ){
									window['p_config_'+$scope[increment].handler.name].revoke();
									$delete('p_config_'+$scope[increment].handler.name);
								}
								delete $scope[increment];
							}
						}else{
							if(val==vallue.abs ){

								$('.abs_'+val).remove();
								if(  typeof $scope[increment].onclose != 'undefined' ){
									$scope[increment].onclose();
								}
								if(  typeof $scope[increment].handler != 'undefined' ){
									window['p_config_'+$scope[increment].handler.name].revoke();
									$delete('p_config_'+$scope[increment].handler.name);
								}
								delete $scope[increment];
							}
						}
					}, $scope);
				}, arr);
			}
			var test_abs;
		//	vv( test, 'testingg' );
			let parent_abs;
			if(test.abs.indexOf('<-')!=-1){
				let varcc = test.abs.split('<-');
			//	vv(varc,'varc contem <-');
				test_abs = varcc[0];
				parent_abs = varcc[1];
			}else{
				test_abs = test.abs;
				parent_abs = null;
			}
			var ok = '';
			var sid;
			if( Object.keys($scope).length == 0 ){

				if(test.abs.indexOf('<-')!=-1){
					var varc = test.abs.split('<-');
					if( test_abs==varc[0]){
						ok = varc[0];
						parent_ = '';
						sid = ok;
					}else{
						ok = test_abs;
						sid = test_abs;
					}
				}else{
					ok = test.abs;
					sid = ok;
				}
			}else{

				function tradicional(val){
					var tt = [];
					var aux;
					for( let sc in $scope){
						if( $scope[sc].abs.indexOf("<-") ){
							var varc = $scope[sc].abs.split("<-");
							if(varc[0]==val){
								tt = varc[0];
							}
						}else{
							
							if( $scope[sc].abs==val){
								tt = val;
							}
						}
					}
					return tt;
				}
								
				function get_comp(val){// retorna todos os filhos passado num array
					let tt = [];
					let aux;
					aux = val;
					let abc = 0;
					let auxx;
					auxx= [];
					while( aux.length != 0){
						for( let auu in val){
							for( let sc in $scope){
								if( $scope[sc].abs.indexOf("<-")!=-1 ){
									let varc = $scope[sc].abs.split("<-");
									if(varc[1]==val[auu]){
										tt.push(varc[0]);
									}
								}
							}
							aux = auxx || 0;
						}
						val = auxx;
						auxx = [];
					}
					return tt;
				}
				let ae = [test_abs];
				let bbc = [];
				let tra = tradicional(test_abs);
			//	vv(tra,'tradicional');
				if( tra.length >0){
				//	vv(ae, 'ae');
				//	vv(parent_abs,'parent_abs')
					if(parent_abs == null){
					//	bbc = [ get_comp( ae ) ];
					//	vv(get_comp(ae), 'get_comp')
						bbc =  [tra].concat( ...get_comp( ae ) );
					}else{
						bbc = [...tra,...get_comp( ae ) ];
					}

				}else{
					if(parent_abs != null){
						bbc = [...get_comp( ae ) ];
					}
				}
			//	vv(bbc, 'bbc')
				remove_parent(bbc);
				ok = test_abs;
				sid = ok;
			}
			$('.abs_'+ok).remove(); // add 30/10/20
			/* comentado 30/10/20
			if(ok != ''){
				$('.abs_'+ok).remove();
			}else{
				$('.abs_'+ok).remove();
			}
			*/
		//	if(ok_name){
			//	$vv('existe'); result
			//	return;
			if(!ok_name){
				if(  typeof test.construct !='undefined' ){
					if( typeof padrao.construct != 'undefined'){
						param = padrao.construct;
					}else{
						param = '';
					}
					test.construct(param);
				}
			
				$scope[ name ] = test;
				$scope[ name ]['name'] = test.name || name;

			}
			
			if(  typeof test.handler !='undefined' ){
				let ci = test.handler;
				let name = '';
				let obj = {};
				if( typeof ci['name'] != 'undefined'){
					if( typeof ci['target'] != 'undefined'){
					//	vv('obj targer 1')
						obj = ci.target;
						delete ci.target;
					}
					name = ci['name'];
				//2	delete ci['name'];
				}
				var_create( 'p_config_'+name , Proxy.revocable( obj , ci ) );
				let tem = new Array();
				tem[padrao.nome] =  window['p_config_'+name].proxy;
				var_create( name ,  tem[padrao.nome] );

			}

			if( typeof test.scriptSRC !='undefined' ){
				const arrai = test.scriptSRC;
				$for(function(datts){

					$head(
						$script({class: 'abs_'+sid, src: datts})
					)
				}, arrai);

			}

			if( typeof test.styleSRC !='undefined' ){
				const arrai = test.styleSRC;		
				$for(function(datts){
					$head(
						$link({rel:'stylesheet', class: 'abs_'+sid, href: datts})
					)
				}, arrai);
			}

			if( typeof test.style !='undefined' ){
				$head(
					$style(
						{ class: 'abs_'+sid },
						test.style()
					)
				) 
			}
			if( typeof test.title != 'undefined'){
				document.title = test.title;
			}

			delete test.style;
			var response='';
		//7	response = test.template( value, others );
			if( typeof test.template != 'undefined'){ // new
				response = test.template.bind( $scope[ name ] );
				response = response( value, others );
			}

			if(  typeof test.after !='undefined' ){
			//	setTimeout(()=>{
				test.after();
			//	},500);
			}

			if(  typeof test.router !='undefined' ){
				$router.close();
			}
			
			test = [];
			if(padrao.promise==true){

			}else if(padrao.async==true){
				if( typeof locate == 'string'){
					$html( locate, response );
				}else if( typeof locate =='function'){ // depreciar ?
					locate(response);
				}
			}
			$end_comp();
			return response; //4
		
		}

		const request_sync = function(padrao, name, locate=null ){
			let result;
			let tests;
			try{
				$.ajax({
					url: padrao.src,
					type: 'GET',
					async: padrao.async,
					cache: (isDev?false:true), // PARA DEV
					timeout: 3000,
					dataType: 'text',
					error: function(){	
						console.log('Error Ajax'); 
						return false;
					},
					success: function(data){
						result = data;
						tests = eval(result);
						$delete( name );
						tests = core( tests, padrao, locate );
					}
				});
				return tests;
			}catch(err){
				return false;
			}	
			
		}

		if(padrao.promise==true){
			return new Promise(function(resolve, reject){
				let result;
				let tests;
				try{
					$.ajax({
						url: padrao.src,
						type: 'GET',
						async: padrao.async,
						cache: (isDev?false:true), // PARA DEV
						timeout: 3000,
						dataType: 'text',
						error: function(err){	
							reject(err);
							return false;
						},
						success: function(data){
							result = data;

							tests = eval(result);
							$delete( name );
						//	vv(tests,'Deg_dm_3 974')

							tests = core( tests, padrao, locate );
						//	vv(tests,'Deg_dm_3 974')
							resolve(tests, others);
						}
					});
				}catch(err){
					reject('Error Promise Deg_dm_3.js');
					return false;
				}	

			});
		}else{
			
			if(padrao.async==true){
				let kf = request_sync(padrao, name, locate);
				return kf;

			}else{
				let kf = request_sync(padrao, name, locate);
				return kf;

			}
		}
	}
};

const rtn = function(val=''){
	return'';
}


const $html = function(dom, value='', r=1){
	if(r==1){
	//4	$(dom).hide();
		$(dom).css('display','none');
		return $(dom).html(value).fadeIn(400); // rtn();
	}else{
		$(dom).html(value);
		return rtn();
	}
};

const $removeFade = function(dom, r=1){
	if(r==1){
	//	$(dom).fadeOut(400).remove();
		$.when(
			$(dom).fadeOut(400)
		).done(function(){
			$(dom).remove()
		});
	}else{
		$(dom).remove();

	}
};

const $text = function(dom, value=''){
	$(dom).text(value);
};

const $val = function(dom, value){
	$(dom).val(value);
}

const $rtext = function(val){
	function text_convert(str) {
		function replaceTag(tag) {
			var tagsToReplace = {
			//	'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;'
			};
			return tagsToReplace[tag] || tag;
		}
		return str.replace(/[&<>]/g, replaceTag);
	}
	return text_convert(val);
}

const $before = function(dom, value=''){
	$(dom).before(value);
};

const $prepend = function(dom, value=''){
	$(dom).prepend(value);
};

const $append = function(dom, value=''){
	$(dom).append(value);
};
const $after = function(dom, value=''){
	$(dom).after(value);
};


/* Deprecated */
const $template = function(name, params='', args=''){
//	const srcc = src+name+'.js';
//	var result = '';
	if($scope[name]==undefined){
		if( typeof args == 'function'){
			$component({name:name}, params);
			return $scope[name].template( params, arguments[2], args );
		}else{
			$component({name:name}, params);
			return $scope[name].template( params, arguments[2] );
		}
		
	}else{
		return $scope[name].template( params, arguments[2] );
	}

};


const $head = function( into=""){
	$('head').append(into);
};

const $body = function(into="", arrai={} ){
		let domReady = function(ready) {
			if (document.readyState != 'loading') return ready();
			document.addEventListener('DOMContentLoaded', ready);
			function _ready() {
				document.removeEventListener('DOMContentLoaded', ready);
				ready();
			}
		}
		domReady(function(){
			document.body.innerHTML = " \n "+into;
		});
	(function(){
		// colocar o codigo aqui dentro gastou mais memoria no mozilla
	})();
};

const $for = function( $val,  arrai={} ){
	var aux = '';
	for(var key in arrai){
		aux += $val( arrai[key], key, arguments );
		if( aux == 'undefined'){ aux = '';}
	}
	return aux;
};

// MUDEI 30-09-20
const $for_order = function(  func='', param1, order='asc' , ){
	let aux_temp = '';
	if(order.trim()=='asc' || order.trim() =='ASC'){
		for(let key in param1){
			aux_temp += func(  param1[key], key  )
		}
	}else if(order.trim()=='desc' || order.trim()=='DESC'){
		let temp = Object.keys(param1).sort(function(a,b){
			return b-a
		});
		for(let i = 0; i<temp.length; i++){
		//	console.log(param1[temp[i]]);
			aux_temp += func(  param1[temp[i]], temp[i])
		}
	}
	return aux_temp;
}


const $t = function(tag, arrai={}, into="",f='' ){
	return "<"+tag+faa(arrai)+" "+f+">"+into+"</"+tag+">"+$br_r;
};


const $t1 = function(tag, arrai={}, into="", f='' ){
	return into+"<"+tag+faa(arrai)+" "+f+"/>";
};

const $t2 = function(tag, arrai={}, into="",f='' ){
/* Deprecad */
	return "<"+tag+faa(arrai)+" "+f+">"+into+"</"+tag+">"+$br_r;
};

const $container = function(  into="", arrai={}){
	return "<div class='container' "+faa(arrai)+" >"+into+"</div>";
};

const $row = function( into="",arrai={} ){
	return "<div class='row' "+faa(arrai)+" >"+into+"</div>";
};


const $col_sm_ = function( into="", colum=12){
	return "<div class='col-md-"+colum+"' >"+into+"</div>";
};

const $col_md_ = function(  into="", colum=12){
	return "<div class='col-md-"+colum+"' >"+into+"</div>";
};

const $col_lg_ = function(  into="", colum=12){
	return "<div class='col-lg-"+colum+"' >"+into+"</div>";
};

const $col_xl_ = function(  into="", colum=12){
	return "<div class='col-xl-"+colum+"' >"+into+"</div>";
};


const $script = function( arrai={}, into=""){
	return "<script"+faa(arrai)+" >"+into+"</script>";
};


const $link = function( arrai={}, into=""){
	return "<link"+faa(arrai)+" />";
};

const $style = function( arrai={}, into=""){
	return "<style"+faa(arrai)+" >"+into+"</style>";
};
