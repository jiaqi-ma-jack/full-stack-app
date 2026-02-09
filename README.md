# full-stack-app

## Frontend
Build
```
docker build -t frontend-prod .
```

Run
```
docker run -p 3000:80 frontend-prod
```


## Backend
Build
```
docker build -t backend-prod .
```

Run
```
docker run -p 8080:8080 backend-prod
```