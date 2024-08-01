<?php

// DB connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "speech_to_text";

// Connect to the DB
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $text = $_POST['text'];

    $stmt = $conn->prepare("INSERT INTO recordings (text) VALUES (?)");
    if ($stmt) {
        $stmt->bind_param("s", $text);
        if ($stmt->execute()) {
            echo "New record created successfully";
        } else {
            echo "Execute error: " . $stmt->error;
        }
        $stmt->close();
    } else {
        echo "Prepare error: " . $conn->error;
    }
}

$conn->close();
?>
