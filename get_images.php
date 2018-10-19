<?php

require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

$gal = ORM::for_table('gallery')
            ->where('type', $_GET['type'])->find_many();
$imgs = array();
foreach($gal as $img){
    array_push($imgs, $img->path);
}

echo  json_encode($imgs);
?>
