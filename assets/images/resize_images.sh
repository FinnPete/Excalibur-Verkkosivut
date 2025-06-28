## declare an array variable
declare -a arr=("Exca_room1" "Exca_dm" "Exca_room2" "Exca_doorway" "exca_2" "Exca_games")

## now loop through the above array
for i in "${arr[@]}"
do
   ffmpeg -i "$i.jpg" -vf scale=1080:-1 "$i-min.jpg"
   # or do whatever with individual element of the array
done


