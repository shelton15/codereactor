<?php
require "vendor\shuchkin\simplexlsx\src\SimpleXLSX.php";
use shuchkin\SimpleXLSX;

function searchById($id) {
    $file = "assets/pdfs/$id.pdf";
    return file_exists($file) ? $file : null;
}

function searchByName($name) {
    if ($xlsx = SimpleXLSX::parse('assets/db/CRI24RI001.xlsx')) {
        $rows = $xlsx->rows();
        foreach ($rows as $row) {
            if (strtolower($row[6]) == strtolower($name)) {
                $id = $row[1];
                return searchById($id);
            } 
        }         
    }
    
    return null;
}

function searchByEmail($email) {
    if ($xlsx = SimpleXLSX::parse('assets/db/CRI24RI001.xlsx')) {
        $rows = $xlsx->rows();
        foreach ($rows as $row) {
            if (strtolower($row[4]) == strtolower($email)) {
                $id = $row[1];
                return searchById($id);
            }
        }
    } else {
        echo SimpleXLSX::parseError();
    }
    return null;
}

$response = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
// $post="CRI24RI001";
// $post="Nkeng Robert";
// $post="lihtrevor@gmail.com";

$post = isset($_POST["query"]) ? $_POST["query"] : '';
if (preg_match('/^[A-Za-z]+\s[A-Za-z]+$/', $post)) {
    // Input is a name
    $file = searchByName($post);
} elseif (filter_var($post, FILTER_VALIDATE_EMAIL)) {
    // Input is an email
    $file = searchByEmail($post);
} elseif (preg_match('/^cri\d{2}ri\d{3}$/i', $post)) {
    // Input is an ID (case-insensitive)
    $file = searchById(strtoupper($post));
} else {
    // Invalid input format
    $file = null;
}

// Prepare the response
$response['file'] = $file;
} else{
    header('Location: index.html');
exit;
// header('Content-Type: application/json');
// echo json_encode($response);
}

header('Content-Type: application/json');
echo json_encode($response);
?>
