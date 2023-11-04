# LRU WEBAPP
## 1st step
Clone the repo
```
git clone https://github.com/mridul217/LRUwebapp
```
move inside the folder 
```
cd LRUwebapp
```

## prerequisite
```
docker should be setup already
or you have to run each server seperately-> for this see at last.
```


## How to run 
```
# to build the docker services
docker compose build

# to start the docker services
docker compose up -d

# to stop the docker services
docker compose down
```
## Run without using Docker

### run the backend server
```
cd backend
uvicorn main:app --reload
# localhost:8000
```
### run the frontend server
```
cd frontend # one should be present in root directory
npm start
#localhost:3000
```

## Screens of the react app
![LRUwebapp](./docs/images/image.png)


