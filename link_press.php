<?php

require_once 'idiorm.php';
ORM::configure('sqlite:./db.sqlite');


function create_link($session, $link)
{
    $user = ORM::for_table('links')->create();
    $user->session = $session;
    $user->link = $link;
    $user->save();
    return $user;
}

$session = ORM::for_table('logs')
            ->where('username', $_GET['username'])->order_by_desc('date')
            ->find_one();

create_link($session->id, $_GET['link']);

?>
