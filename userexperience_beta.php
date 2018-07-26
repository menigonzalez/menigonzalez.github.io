<?php
	$ip = $_SERVER['REMOTE_ADDR'];
	$date = date(YmdHis);

	$json = $_POST['string01'].', "IP":"'.$ip.'"'.$_POST['string02'];

	$file = fopen("userexperience_beta/".$date."_".$ip.".json", "w") or die("Error creating file.");
	fwrite($file, stripslashes($json));
	fclose($file);
	//sleep(10);
?>