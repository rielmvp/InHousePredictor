<?php
session_start(); // Start a new session or resume the existing one

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'src/PHPMailer.php';
require 'src/Exception.php';
require 'src/SMTP.php';

$response = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Instantiate PHPMailer
    $mail = new PHPMailer();

    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'contactmygroup7@gmail.com';
        $mail->Password = 'MyGroup7@123';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Sender and recipient details
        $mail->setFrom($email, $name);
        $mail->addAddress('contactmygroup7@gmail.com');

        // Email content
        $mail->Subject = $subject;
        $mail->Body = "Name: $name\nEmail: $email\nSubject: $subject\nMessage:\n$message";

        // Send the email
        if ($mail->send()) {
            $response['success'] = true;
            $response['message'] = 'Email sent successfully!';
        } else {
            $response['success'] = false;
            $response['message'] = 'Oops! Something went wrong while sending the email.';
        }
    } catch (Exception $e) {
        $response['success'] = false;
        $response['message'] = 'Oops! Something went wrong. ' . $mail->ErrorInfo;
    }

    // Display the response message
    if (isset($response['message'])) {
        echo '<div class="alert ' . ($response['success'] ? 'alert-success' : 'alert-danger') . '">' . $response['message'] . '</div>';
    }
}
?>
