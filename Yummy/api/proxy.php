<?php
$lat = $_GET['lat'];
$lng = $_GET['lng'];
$range = $_GET['range'];
$ret = file_get_contents('http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=a5f50ab7cb657cb2&format=json&lng='.  $lng .'&lat='. $lat . '&range=' . $range);
echo $ret;