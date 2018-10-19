<?php
    require_once 'idiorm.php';
    ORM::configure('sqlite:./db.sqlite');


function create_user($username, $password, $email)
{
    $user = ORM::for_table('users')->create();
    $user->username = $username;
    $user->password = $password;
    $user->email = $email;
    $user->save();
    return $user;
}
function create_logs($username) {
    $log = ORM::for_table('logs')->create();
    $log->username = $username;
    $log->save();
    return $log;
}

    $username = $_POST['username'];
    $person = ORM::for_table('users')->where('username', $username)->find_one();
    if(empty($person)){
        create_user($username, $_POST['password'], $_POST['email']);
        session_start();
        $_SESSION[$username] = $username;
        create_logs($username);
        echo 'ok';
    }
    else{
        echo 'Inregistrare esuata!';
    }
?>
