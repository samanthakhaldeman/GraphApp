# GraphApp

Created by Rakesh Podder and Samantha Haldeman



# Loading on Mac

### Clone GraphApp Repository

git clone https://github.com/samanthakhaldeman/GraphApp.git


### Install npm (if you don't already have it)

https://nodejs.org/en/download

Follow the link above and install the .pkg file for Mac

Double click on the file that was downloaded and follow the instructions through the installation process. 


### Install Rust (if you don't already have it)

curl https://sh.rustup.rs -sSf | sh


### Install dependencies

cd GraphApp
npm install


### Fix Variable Name

After an update to Tauri, there was one variable name that was changed and broke a bunch of things with Vite. So we have to fix that. 

Go into GraphApp/node_modules/vite-plugin-tauri/dist/index.js

on line 108, it probably currently says devPath, change it devUrl. It should look like this:

devUrl: `${protocol}://${host}:${port}`


### Run Program

npm run dev

The first build/run will take a little while to load because it has to compile everything, but each following run will be much faster. 




# Loading on Linux

### Clone GraphApp Repository

git clone https://github.com/samanthakhaldeman/GraphApp.git


### Install npm (if you don't already have it)

https://nodejs.org/en/download

Follow the link above and install the .pkg file for Linux

Double click on the file that was downloaded and follow the instructions through the installation process. 


### Install Rust (if you don't already have it)

curl https://sh.rustup.rs -sSf | sh


### Install dependencies

cd GraphApp
npm install


### Fix Variable Name

After an update to Tauri, there was one variable name that was changed and broke a bunch of things with Vite. So we have to fix that. 

Go into GraphApp/node_modules/vite-plugin-tauri/dist/index.js

on line 108, it probably currently says devPath, change it devUrl. It should look like this:

devUrl: `${protocol}://${host}:${port}`


### Run Program

npm run dev

The first build/run will take a little while to load because it has to compile everything, but each following run will be much faster. 




# Loading on Windows

### Clone GraphApp Repository

git clone https://github.com/samanthakhaldeman/GraphApp.git


### Install npm (if you don't already have it)

https://nodejs.org/en/download

Follow the link above and install the .pkg file for Windows

Double click on the file that was downloaded and follow the instructions through the installation process. 


### Install Rust (if you don't already have it)

Go to https://doc.rust-lang.org/cargo/getting-started/installation.html 

Download rustup-init.exe, double click on that file and follow the instructions through the installation process. 


### Install dependencies

cd GraphApp
npm install


### Fix Variable Name

After an update to Tauri, there was one variable name that was changed and broke a bunch of things with Vite. So we have to fix that. 

Go into GraphApp/node_modules/vite-plugin-tauri/dist/index.js

on line 108, it probably currently says devPath, change it devUrl. It should look like this:

devUrl: `${protocol}://${host}:${port}`


### Run Program

npm run dev

The first build/run will take a little while to load because it has to compile everything, but each following run will be much faster. 