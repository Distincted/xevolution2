
navbar_pi = {
	abs:'navbar_pi<-1',
	after(){
		
	
		
	},
	onclose(){
		
	},
	template(){
		return(
			$t2('nav',{class:'navbar navbar-expand-lg navbar-mainbg'},
				$t2('a',{class:'navbar-brand navbar-logo', href:'#'},'Navbar')
				+$t2('button',{class:'navbar-toggler',type:'button','data-toggle':'collapse','data-target':'#navbarSupportedContent', 'arial-controls':'navbarSupportedContent','arial-expanded':'false', 'arial-label':'Toggle navigation'},
					$t2('i',{class:'fas fa-bars text-white'})
				)
				+$t2('div',{class:'collapse navbar-collapse', id:'navbarSupportedContent'},
					$t2('ul',{class:'navbar-nav ml-auto'},
						$t2('div',{class:'hori-selector'},
							$t2('div',{class:'left'})
							+$t2('div',{class:'right'})
						)
						+$t2('li',{class:'nav-item'},
							$t2('a',{class:'nav-link '},
								$t2('i',{class:'fas fa-tachometer-alt'})
								+'Dashboard'
							)
						)
						 +$t2('li',{class:'nav-item'},
							$t2('a',{class:'active nav-link'},
								$t2('i',{class:'far fa-address-book'})
								+'Address Book'
							)
						)
						+$t2('li',{class:'nav-item'},
							$t2('a',{class:'nav-link '},
								$t2('i',{class:'far fa-clone'})
								+'Components'
							)
						)
						+$t2('li',{class:'nav-item'},
							$t2('a',{class:'nav-link '},
								$t2('i',{class:'far fa-calendar-alt'})
								+'Calendar'
							)
						)
						+$t2('li',{class:'nav-item'},
							$t2('a',{class:'nav-link '},
								$t2('i',{class:'far fa-chart-bar'})
								+'Charts'
							)
						)
						+$t2('li',{class:'nav-item'},
							$t2('a',{class:'nav-link ', onclick:'$scope.main.exit();'},
								$t2('i',{class:'far fa-copy'})
								+'Sair'
							)
						)

					)
				)
			)
			
		)
	},
	style(){
		return(``)
	},
	call_func(){
		var tabsNewAnim = $('#navbarSupportedContent');
		var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
		var activeItemNewAnim = tabsNewAnim.find('.active');
		var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
		var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
		var itemPosNewAnimTop = activeItemNewAnim.position();
		var itemPosNewAnimLeft = activeItemNewAnim.position();
		$(".hori-selector").css({
			"top":itemPosNewAnimTop.top + "px", 
			"left":itemPosNewAnimLeft.left + "px",
			"height": activeWidthNewAnimHeight + "px",
			"width": activeWidthNewAnimWidth + "px",
			"color":"#5161ce"
		});

		$("#navbarSupportedContent").on("click","li",function(e){
			$('#navbarSupportedContent ul li').removeClass("active");
			//	.css('color','#5161ce');
			$(this).addClass('active');
		//	$(this).css('color','#5161ce');
			var activeWidthNewAnimHeight = $(this).innerHeight();
			var activeWidthNewAnimWidth = $(this).innerWidth();
			var itemPosNewAnimTop = $(this).position();
			var itemPosNewAnimLeft = $(this).position();
			$(".hori-selector").css({
				"top":itemPosNewAnimTop.top + "px", 
				"left":itemPosNewAnimLeft.left + "px",
				"height": activeWidthNewAnimHeight + "px",
				"width": activeWidthNewAnimWidth + "px"
			});
		});
		let aux = $('.active');
		aux.parent().attr('class','active nav-item');
		aux.attr('class','nav-link');
	}
}


// ---------Responsive-navbar-active-animation-----------
	

