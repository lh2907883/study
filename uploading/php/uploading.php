<?php

	$filename = '/var/www/uploading/wenj/'.$_FILES['files']['name'];


	$data = file_get_contents($_FILES['files']['tmp_name']); //,FILE_APPEND


	file_put_contents($filename,$data);

	echo '上传成功';
?>
