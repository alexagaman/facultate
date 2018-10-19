<?php

function create_logs($username) {
    $log = ORM::for_table('logs')->create();
    $log->username = $username;
    $log->save();
    return $log;
}
    require_once 'idiorm.php';
    ORM::configure('sqlite:./db.sqlite');
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    $person = ORM::for_table('users')->where('username', $username)->find_one();
    if($person->password == $password){
        session_start();
        $_SESSION[$username] = $username;
        create_logs($username);
        echo "ok";
    }
    else{
        echo "email or password does not exist."; // wrong details
    }

?>
