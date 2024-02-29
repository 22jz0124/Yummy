<?php
$id = $_GET['id'];
$ret = file_get_contents('https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=a5f50ab7cb657cb2&format=json&id='. $id);
echo $ret;