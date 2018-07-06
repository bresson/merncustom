     ,-----.,--.                  ,--. ,---.   ,--.,------.  ,------.
    '  .--./|  | ,---. ,--.,--. ,-|  || o   \  |  ||  .-.  \ |  .---'
    |  |    |  || .-. ||  ||  |' .-. |`..'  |  |  ||  |  \  :|  `--, 
    '  '--'\|  |' '-' ''  ''  '\ `-' | .'  /   |  ||  '--'  /|  `---.
     `-----'`--' `---'  `----'  `---'  `--'    `--'`-------' `------'
    ----------------------------------------------------------------- 


MERN Stack based on Fullstack React Projects

Installed linux brew

MongoDB 
https://community.c9.io/t/setting-up-mongodb/1717
sudo apt-get install -y mongodb-org


Running MongoDB on a Cloud9 workspace
MongoDB is preinstalled in your workspace. To run MongoDB, run the following below (passing the correct parameters to it). Mongodb data will be stored in the folder data.
$ mkdir data
$ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
$ chmod a+x mongod

You can start mongodb by running the mongod script on your project root:

$ ./mongod
https://community.c9.io/t/mongodb-not-running-properly/12765/4

// how to start with package.json so separate command not required?


Hi there! Welcome to Cloud9 IDE!

To get you started, we included a small hello world application.

1) Open the hello-world.html file

2) Click on the Preview button to open a live preview pane

3) Make some changes to the file, save, watch the preview, and have fun!

Happy coding!
The Cloud9 IDE team


## Support & Documentation

Visit http://docs.c9.io for documentation, or http://support.c9.io for support.
To watch some training videos, visit http://www.youtube.com/user/c9ide
