<?php
$curl = curl_init();
$API_KEY = file_get_contents('api_key.txt', FALSE, NULL, 0, 36);    //api_key.txt berada pada folder yang sama dan berisi key setelah mendaftar pada currencyapi.net

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://currencyapi.net/api/v1/rates?key=' . $API_KEY . '&output=JSON',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
]);
$response = curl_exec($curl);
curl_close($curl);

$file = "[$response]";
file_put_contents("rate.json", $file);  //"rate.json" akan ditempatkan pada folder yang sama, meskipun bisa ditempatkan di folder lain

echo date('j M Y, H:i:s', json_decode($response)->updated); //Format untuk print kapan rate terakhir update.
