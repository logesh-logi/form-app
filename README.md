Hello  Everyone. This form app project is just basic one, it will get data from the user using form and send it to backend, backend then store it in the database.
I have also depolyed it in aws using EC2 instance.
How i have deployed it in AWS ?:
1. created EC2 instance and ssh into it.
2. using git clone command I, cloned my code to ec2 instance.
3. Then I setup postgres locally in that ec2 instance, and migrated my database there using pgdump.
4. Now that we have setup database, then we have to have webserver I have used nginx for this project.
5. Then I have build my react frontend and copied it to nginx folder.
6. Then I run my Node backend as a deamon process using PM2.
7. Then I configured nginx to serve the react frontend when requested for ip and any request prefix with /api/ will go to backend.
