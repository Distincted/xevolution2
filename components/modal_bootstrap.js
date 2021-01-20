modal_bootstrap={
	abs:'modal_bootstrap',
	template(){
		let dbase = ['agenda','logged','pontos','user'];
		return(
			/*
			`<div class="modal" tabindex="-1" role="dialog">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">Modal title</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<p>Modal body text goes here.</p>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary">Save changes</button>
							<button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="$scope.modal_bootstrap.close();">Close</button>
						</div>
					</div>
				</div>
			</div>`
			*/
			$t('div',{class:'modal', tabindex:-1, role:'dialog'},
				$t('div',{class:'modal-dialog', role:'document'},
					$t('div',{class:'modal-content'},
						$t('div',{class:'modal-header'},
							$t('h5',{class:'modal-title'},
								'Modal Title'
							)
							+$t('button',{type:'button', class:'close', 'data-dismiss':'modal', 'aria-label':'Close'},
								$t('span',{'aria-hidden':true},'&times;')
							)
						)
						+$t('div',{class:'modal-body'},
							$t('select',{id:'sel_db'},
								$for(function(v, i){
									return(
										$t('option',{value: v }, v)
									)
								}, dbase)
							)
							+$t('button',{class:'btn btn-danger', onclick:`(function(){
								
								clear_db( $("#sel_db").val() ).then((res)=>{
									toast("Limpado Com Sucesso", "body", 1, 2);
									
								})
							})()`},'Limpar Dados')

						)
						+$t('div',{class:'modal-footer'},
							$t('button',{type:'button', class:'btn btn-primary'},'Save changes')
							+$t('button',{type:'button', class:'btn btn-secondary', 'data-dismiss':'modal', onclick: '$scope.modal_bootstrap.close();'},'Close')
						)
					)
				)
			)
		);
	},
	close(){
		$removeFade('.modal');
		$remove_component('modal_bootstrap');
	}
}