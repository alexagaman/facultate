<?php
require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

$logs = ORM::for_table('logs')
            ->where_lte('date', $_GET['lastDay'])
            ->where_lte('date', $_GET['firstDay'])
            ->find_many();
$logs2 = array();
foreach($logs as $log){
    array_push($logs2, $log->date);
}

echo json_encode($logs2);


?>
