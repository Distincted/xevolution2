

	footer = {
		abs: 'footer',
		/*
		$body(
			$t('iframe',{src:'https://redeantimal.000webhostapp.com/start/testRequest',style:'width:100%;height:23em;'})
		);
		document.body.innerHTML = '<iframe src="https://redeantimal.000webhostapp.com/start/testRequest" style="width:100%;height:23em;" ></iframe>';
		*/
		call_test(){
			if($('#callmodal').html() != ''){
			//	$html('#callmodal','');
				$end_comp('iframe')
				return;
			}
			$html('#callmodal',
				$t('iframe',{src:'https://redeantimal.000webhostapp.com/start/testRequest',style:'width:100%;height:23em;'})
			);
		},
		template(){
			return new Promise((resolve, reject)=>{
				resolve(
					$t('footer', {class: "page-footer font-small blue", style: "text-shadow: 1px 1px 1px blanchedalmond;"},
					//	$t('button',{onclick:'$scope.'+this.name+'.call_test(); '},'Iframe')+
						$t('div', {class: 'footer-copyright text-center py-3'},
							'&copy; Copyright 2020  '+$t1('br')+
							$t('a',{class:"cp"},
								'Final Version'
							
							)
						)
					)
				);
			});
		}
	};

		


