<?php
require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');

function create_message($username, $message)
{
    $user = ORM::for_table('chat')->create();
    $user->username = $username;
    $user->message = $message;
    $user->save();
    return $user;
}

create_message($_POST['username'],$_POST['message']);
echo 'ok';

?>
