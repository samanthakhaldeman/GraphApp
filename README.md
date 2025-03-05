# GraphApp



## Loading on Mac

### Clone GraphApp Repository

git clone https://github.com/samanthakhaldeman/GraphApp.git

### Install npm (if you don't already have it)

https://nodejs.org/en/download

Follow the link above and install the .pkg file for Mac

Double click on the file that was downloaded and follow the instructions through the installation process. 

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



## Loading on Linux

### Clone GraphApp Repository

git clone https://github.com/samanthakhaldeman/GraphApp.git

### Install npm (if you don't already have it)

https://nodejs.org/en/download

Follow the link above and install the .pkg file for Linux

Double click on the file that was downloaded and follow the instructions through the installation process. 

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



## Loading on Windows

### Clone GraphApp Repository

git clone https://github.com/samanthakhaldeman/GraphApp.git

### Install npm (if you don't already have it)

https://nodejs.org/en/download

Follow the link above and install the .pkg file for Windows

Double click on the file that was downloaded and follow the instructions through the installation process. 


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