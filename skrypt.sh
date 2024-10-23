#!/bin/sh

output_file="wynik_front-dane.txt"

for plik in "$@"
do
    echo "########## $plik ##########" >> "$output_file"
    cat "$plik" >> "$output_file"
done
