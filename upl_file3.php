<?php

require_once 'idiorm.php';
ORM::configure('sqlite:db.sqlite');

function create_picture($path, $type)
{
    $user = ORM::for_table('gallery')->create();
    $user->path = $path;
    $user->type = $type;
    $user->save();
    return $user;
}

if(isset($_FILES["file"]["type"])){
    $validextensions = array("jpeg", "jpg", "png");
    $temporary = explode(".", $_FILES["file"]["name"]);
    $file_extension = end($temporary);
    if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg")
        || ($_FILES["file"]["type"] == "image/jpeg")) && ($_FILES["file"]["size"] < 100000)
        && in_array($file_extension, $validextensions))
    {
        if ($_FILES["file"]["error"] > 0)
        {
            echo "Return Code: " . $_FILES["file"]["error"] . "<br/><br/>";
        }
        else
        {
            if (file_exists("upload/" . $_FILES["file"]["name"])) {
                echo $_FILES["file"]["name"] . " <span id='invalid'><b>already exists.</b></span> ";
            }
            else
            {
                $sourcePath = $_FILES['file']['tmp_name']; // Storing source path of the file in a variable
                $targetPath = "upload/".$_FILES['file']['name']; // Target path where file is to be stored
                move_uploaded_file($sourcePath,$targetPath) ; // Moving Uploaded file
                create_picture($targetPath, 'botezuri');
                echo 'ok';

            }
        }
    }
}
?>
