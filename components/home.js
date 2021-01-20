
home = {
	abs: '2<-1',
	template(){
		return(
			$t('div',{},
				$t('div',{class:'jumbotron'},
					$t('button',{class:'btn btn-success', onclick: '$scope.home.positivo();'},'Ponto Positivo Pra Você')
					
					+$t('button',{class:'btn btn-danger', onclick: '$scope.home.negativo();'},'Ponto Negativo Pra Você')
					+$t('div',{id:'exit_', style: 'font-size: 41pt; display: grid;'})
				)

			)
			+$t('div',{id:'showcase-wrapper'},
				$t('div',{id:'myCalendarWrapper'})
				+$t('div',{id:'example'},
					$t('h3',{},
						$t('p',{id:'current-date'})
					)
					+$t('h3',{},
						$t('p',{id:'current-day'})
					)
					+$t('h3',{},
						$t('p',{id:'current-datestring'})
					)
				)
			)

			+$t('div',{id:'curve_chart',style:'width: 900px; height: 500px'})

			+$t('div',{id:'inpu_chart'},
				$t('label',{class:'badge badge-success'},'Escolha Um Periodo de Tempo:')
				+$t1('input',{ type:'number', value:10, placeholder:'',id:'input_id_charts',class:'form-control'})
				+$t('button',{ onclick:'$scope.home.chart()', class:'btn btn-primary'},'Filtrar')
			)
		//	+$t('button',{class:'', onclick:'$scope.home.chart()'},'Gráfico')

			+$t('div',{id:'dasf_chart'})
		//	+$t('div',{id:'myCalendarWrapper'})
		)
	},
	chart(){
		if( typeof google.charts.loader != 'undefined'){
		//	var chart = document.getElementById('curve_chart');
		//	chart.clearChart();

		}
		/*
		if($('#dasf_chart').html() =='' ){
			$html('#dasf_chart',
				$t('label',{},'Escolha Um Periodo de Tempo:')
				+$t1('input',{value:30, placeholder:''})
				+$t('button',{onclick:''},'Filtrar')
			);
		}else{
			$html('#dasf_chart',
				''
			);
			return false;
		}
		*/
		let total_day = parseInt( $('#input_id_charts').val() );
		let arr = [];
		for(let i = 0; i< total_day;i++){
			var d = new Date();

		//	document.write('Today is: ' + d.toLocaleString());
		//	arr.push( d.setDate(d.getDate() - i) )
			arr.push( $scope.home.get_id_from_date( d.setDate(d.getDate() - i) ) );

		//	d.setDate(d.getDate() - 33);

		//	document.write('<br>5 days ago was: ' + d.toLocaleString());

		}
	//	vv(arr,'arr');
		var aux_=[ ['Dias', 'positivos', 'negativo'] ];
	//	vv(aux_, 'aux_ 111')
		get_value_db('pontos', { own: $scope.main.email }).then((res)=>{
		//	vv(res,'reees');
			$for_order((item, key)=>{
			//	vv(item,'item')
			//	if( res.includes(item) ){
				var tes = false;
				for(let a in res ){
					if( res[a].date_ == item ){
					//	aux_.push( [ parseInt(item), parseInt( res[a].positivo), parseInt( res[a].negativo) ] );
						let b = new Date(item);
						aux_.push( [ b.getDate() + '/' + (b.getMonth()+1)  , parseInt( res[a].positivo), parseInt( res[a].negativo) ] );
						tes = true;
						break;
					}else{

					//	aux_.push( [item, 0, 0 ] );

					}	
				}
				if( tes == false){
					let b = new Date(item);

					aux_.push( [ b.getDate() + '/' + (b.getMonth()+1),  0, 0 ] );
				}
				/*
				if( typeof res !='undefined' ){
					aux_.push( [item, res[item].positivo, res[item].negativo ] );
				}else{
					aux_.push( [item, 0, 0 ] );
				}
				*/
			}, arr,'desc');
			google.charts.load('current', {'packages':['corechart']});
			google.charts.setOnLoadCallback(drawChart);

			function drawChart() {
			//	vv(aux_, 'aux_ 222')

				var data = google.visualization.arrayToDataTable(
					aux_
				);
				

				var options = {
					title: 'Company Performance',
					curveType: 'function',
					legend: { position: 'bottom' }
				};

				var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
				chart.draw(data, options);
			}
		//	vv(aux_, 'aux_')
		});
	
	//	return;


	},
	end(){
		const nextYear = new Date().getFullYear() + 1;
		const myCalender = new CalendarPicker('#myCalendarWrapper', {
		// If max < min or min > max then the only available day will be today.
			min: new Date(Date.UTC(new Date().getFullYear()-2)),
			max: new Date(nextYear, 10) // NOTE: new Date(nextYear, 10) is "Sun Nov 01 nextYear"
		});
		const currentDateElement = document.getElementById('current-date');
		currentDateElement.textContent = myCalender.value;

		const currentDayElement = document.getElementById('current-day');
		currentDayElement.textContent = myCalender.value.getDay();

		const currentToDateString = document.getElementById('current-datestring');
		currentToDateString.textContent = myCalender.value.toDateString();

		myCalender.onValueChange((currentValue) => {
			let date_now = $scope.home.get_id_from_date( currentValue );
			$scope.home.onValueChange(date_now);

		});

		let idd = $scope.home.get_id_from_date();
		get_value_db('pontos', {'date_': idd, own: $scope.main.email }).then((res)=>{
	//	get_value_db('pontos', {'date_': idd, own: $scope.main.email }).then((res)=>{
		//	vv(res,'home.js');
			$scope.home.date_selected = idd;
			if(res.length==0){
				$scope.home.pontos_interface( 0, 0 );
			}else{
				$scope.home.pontos_interface( res[0].positivo||0, res[0].negativo || 0)
			}


		});

	},
	date_selected: '',
	pontos_interface(positivo='', negativo=''){
		$html('#exit_',
			$t('span',{class:'badge badge-success'}, positivo )
			+$t('span',{class:'badge badge-danger'}, negativo )
		)
	},
	onValueChange(dats){
	//	vv(dats,'data')
		get_value_db('pontos', {'date_': dats, own: $scope.main.email }).then((res)=>{
		//	vv(res, 'onValueChange');
			$scope.home.date_selected = dats;
			if( res.length == 0){
				$scope.home.pontos_interface(0, 0 );	
				
			}else{
				$scope.home.pontos_interface(res[0].positivo, res[0].negativo );	
			}
		});
	},
	get_id_from_date(dats=null){
		let now;
		if(dats==null){
			now = new Date();
		}else{
			now = new Date(dats);
		}
		let startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

		let now_id = new Date( startOfDay );
		return now_id.getTime();
	},
	positivo(){
	//	let idd = $scope.home.get_id_from_date();
		let idd = $scope.home.date_selected;
		get_value_db('pontos', {'date_': idd, own: $scope.main.email }).then((res)=>{
		//	vv(res,'pontos positivo');
			if( res.length == 0){
				set_values_db('pontos', {date_: idd, positivo: 1, negativo: 0, own: $scope.main.email }).then((re)=>{
				//	vv(re, 'positivo resposta');
					$scope.home.pontos_interface(re[0].positivo, re[0].negativo );	

				}).catch((r)=>{
				//	vv(r, ' erro positivo resposta');

				});
			}else{
				update_db('pontos',  {positivo: res[0].positivo +1, negativo: res[0].negativo, own: res[0].own, date_: idd },{date_: idd, own: $scope.main.email } ).then((re)=>{
				//	vv(re, 'RE atualizado com sucesso');
					$scope.home.pontos_interface(re[0].positivo, re[0].negativo );	

				});

			}
		//	vv(res,'positivo') date_:1609729200000
		});
	},
	negativo(){
	//	let idd = $scope.home.get_id_from_date();
		let idd = $scope.home.date_selected;

		get_value_db('pontos', {'date_': idd, own: $scope.main.email }).then((res)=>{
		//	vv(res,'pontos');
			if( res.length == 0){
				set_values_db('pontos', {date_: idd, positivo: 0, negativo: 1, own: $scope.main.email }).then((re)=>{
				//	vv(re, 'negativo resposta');
					$scope.home.pontos_interface(re[0].positivo, re[0].negativo );	

				}).catch((r)=>{
				//	vv(r, ' erro positivo resposta');

				});
			}else{
				update_db('pontos',  {positivo: res[0].positivo , negativo: res[0].negativo+1, own: res[0].own, date_: idd },{ date_: idd, own: $scope.main.email })

				.then((re)=>{
				//	vv(re, 'RE update_db com sucesso');
					$scope.home.pontos_interface(re[0].positivo, re[0].negativo );	

				});

			}
		//	vv(res,'positivo') date_:1609729200000
		});
	}
}