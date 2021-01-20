<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<title>Agenda.io</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
	<link rel='manifest' href='/manifest.json'>
	<meta http-equiv="Content-Language" content="pt-br">
	 <meta content="text/html; charset=UTF-8; X-Content-Type-Options=nosniff" http-equiv="Content-Type" />
<!--   <meta http-equiv="X-UA-Compatible" content="IE=edge">
  
    <meta http-equiv="keywords" content=", cidade, ">
    <meta name="author" content=" dmTecnologia ">
    <meta name="apple-mobile-web-app-title" content="Ralisk ">
    <meta name="description" content="Ralisk ">
    <meta name="copyright" content="Copyright © 2019 Ralisk ">

    <meta name="generator" content="Jekyll v3.7.3" />
	<meta property="og:title" content="" />
	<meta name="author" content="" />
	<meta property="og:locale" content="en_US" />
	<meta name="description" content="" />
	<meta property="og:description" content="" />
	<link rel="canonical" href="" />
	<meta property="og:url" content="" />
	<meta property="og:site_name" content="" />
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content="2012-11-22T10:44:25+00:00" />
    <link rel="canonical" href="" />

 -->

	<!-- <link rel="shortcut icon" type="image/x-icon" href="/assets/img/logo-icon.png"/> -->

	<link rel="icon" href="/assets/icons/icon_24.png" type="image/x-icon">

	<script src="/assets/js/lib/jqpobo.js"></script>

<!-- 	<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script> -->
	

	<link rel="stylesheet" href="/assets/css/lib/bootstrap.min.css"/>
	<link rel="stylesheet" href="/assets/css/lib/example.css"/>
	<link rel="stylesheet" href="/assets/css/painel.css"/>
	<script src="/assets/js/tools.js"></script>
	<script src="/assets/js/lib/Deg-dm_3.js"></script>
	<script src="/assets/js/lib/sha512.min.js"></script>
	<!-- <script src="/assets/js/lib/micror.js"></script> -->

	<script src="/assets/js/lib/CalendarPicker.js"></script>
	<link rel="stylesheet" href="/assets/css/lib/CalendarPicker.style.css"/>

	<meta name="theme-color" content="#ffffff" />
	<style>
	body{ 
		font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";  
		 background: rgb(0,212,255);
         
	</style>
	<script>
		// Impedir iframe 
		if (self != top) { top.location.replace(window.location.href) }
	</script>
	
	<script>
		
		//	mellow ads 10:18
		if ("serviceWorker" in navigator) {
			function go_load_pwa(){
			//	isDev = true; return false;  // coment para ATIVAR O PWA e coloque o isDev em false no Deg-dm3
				window.addEventListener('load',()=>{
					navigator.serviceWorker.register('/sw.js',{scope: '/'}).then((reg)=>{
						console.log('Service worker registrado, segundo ele' );
					//	console.log(reg );
					}).catch((err)=>{
						console.log('Error ', err);
					});
				});

			}

			go_load_pwa();
		}
		


		/* REMOVE SERVICE WORKER

		*/
		function remove_pwa(){
			navigator.serviceWorker.getRegistrations().then(function(registrations) {
				for(let registration of registrations) {
					registration.unregister()
				}
			});
		}
	</script>
	<!-- <script src="/components/modal_bootstrap.js"></script> -->


	<script src="/assets/js/lib/_pindexeddb.js"></script>
	<script src="/assets/js/lib/google_chats_line.js"></script>
	<?php require_once('./view/home.php') ?>