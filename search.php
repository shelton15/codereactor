<?php
require "vendor\shuchkin\simplexlsx\src\SimpleXLSX.php";

function searchById($id) {
    $file = "assets/pdfs/$id.pdf";
    return file_exists($file) ? $file : null;
}

function searchByName($name) {
    if ($xlsx = SimpleXLSX::parse('assets/db/CRI24RI001.xlsx')) {
        $rows = $xlsx->rows();
        foreach ($rows as $row) {
            if (strtolower($row[1]) == strtolower($name)) {
                $id = $row[0];
                return searchById($id);
            }
        }
    } else {
        echo SimpleXLSX::parseError();
    }
    return null;
}

$response = [];
// $post="CRI24RI001";
if (isset($_POST['query'])) {
    // if($post){
    $query = $_POST['query'];
    $file = searchById($query);
    if (!$file) {
        $file = searchByName($query);
    }
    $response['file'] = $file;
}

header('Content-Type: application/json');
echo json_encode($response);
?>
