# my-AppBackEnd

Backend / API for the my-AppBackEnd made with [LoopBack](http://loopback.io).

## Getting Started
  Before Running the project please follow this instructions:
* Install [Docker](https://docs.docker.com/engine/installation/) follow instructions depending on your operating system.
* Make sure docker-compose is installed(try with `docker-compose -v`) if not please [install it](https://docs.docker.com/compose/install/)

### Running the loopback application
  To run the application using docker-compose:
   ```
   $ docker-compose up
   ``` 
   Docker-compose will build the image(if not already built) for our project(this can take 5-10 minutes)
   and procceed to run it and also run the mongodb image and link them, in the console you will see:

   ```
   loopback_1  | 
   loopback_1  | [nodemon] 1.11.0
   loopback_1  | [nodemon] to restart at any time, enter `rs`
   loopback_1  | [nodemon] watching: *.*
   loopback_1  | [nodemon] starting `babel-node .`
   loopback_1  | Web server listening at: http://0.0.0.0:3000
   loopback_1  | Browse your REST API at http://0.0.0.0:3000/explorer
   ```

   Open your browser at the http://0.0.0.0:3000/explorer and you should see the swagger ui.

## Development workflow
* After running `docker-compose up` to access our project's container run:
	`docker exec -it my-AppBackEnd bash` here go ahead and use the npm scripts(listed below)
* To access the mongodb container run:
	`docker exec -it myapp_mongo_1 mongo` this will let you in the mongo shell.
* To list running container run:
	` docker ps`
  

## Docker commands
   * `docker-compose up -d`: build and run mongodb and project images in background
   * `docker-compose up`: build and run mongodb and project images
   * `docker-compose stop`: stop the docker-compose builded containers
   * `docker-compose down`: delete the docker-compose builded containers
   * `docker-compose stop [container_name/container_id]`: stop a specific container
   * `docker logs [container_name/container_id]`: Visualize the logs content of a container 


