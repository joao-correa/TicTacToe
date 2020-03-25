# Tic Tac Toe - (Vue + Node + Socket)

## Project description
```
	- A tic-tac-toe game,that was made with vue and node, to improve my knowledgement of socket.	
	- The game was build to be played by two players in different devices.
```

## Project setup
```
	- npm install socket-service folder
	- npm install rest-service folder
	- npm install fronend folder
	- set environment variable in the frontend projet to point to the address of the backend (do not use 'localhost')
		VUE_APP_SOCKET_HOST
		VUE_APP_API_HOST
	- set environment variable in the rest-service to 
		DBURI=mongo url
		AUTH_KEY=some auth key
		DB_NAME=database name
```

## Project startup 
```
	- 'npm run serve' for the frontend folder.
	- 'npm start' for the socket-service folder.
	- 'npm start' for the rest-service folder.
```