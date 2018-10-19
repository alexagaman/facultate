<?php

require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

class Message{
    public $username;
    public $message;
    function __construct ($username, $message) {
        $this->username = $username;
        $this->message = $message;
    }
}

$chat = ORM::for_table('chat')
            ->order_by_asc('date')
            ->find_many();
$messages = array();
foreach($chat as $msg){
    array_push($messages, new Message($msg->username, $msg->message));
}

echo json_encode($messages);


?>
