<?php
require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');


$session = ORM::for_table('logs')
            ->where('username', $_GET['username'])->order_by_desc('date')
            ->find_one();
$links = ORM::for_table('links')
            ->where('session', $session->id)->order_by_asc('date')
            ->find_many();
$history = array();
foreach($links as $l){
    array_push($history, $l->link);
}
echo json_encode($history);
?>
