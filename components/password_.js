

	password_ = {
		abs: 'password_<-1',
		template: (data)=>{
			let val = parseInt(data)+1;
			return(
				$t2('div',{style: 'display: flex;', id: 'field'+data},
					$t2('abbr',{title: 'A quantidade de colunas influência na senha'},
						$t2('label', {class: 'badge badge-secondary align-middle'},
							''+val+':',
							'btn_pass'
						)
					)+
					$t1('input', {type: 'password', class: 'form-control pass_field', id: 'pass_'+data, placeholder: 'Campo nº '+val},
						''
					)
				)
			)
		}
	}