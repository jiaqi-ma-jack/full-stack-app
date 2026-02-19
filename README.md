# full-stack-app

## Frontend
Build
```
docker build -t frontend-prod .
```

Run
```
docker run -p 3000:3000 frontend-prod
```

Load the image into the cluster
```
kind load docker-image frontend-prod
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

Load the image into the cluster
```
kind load docker-image backend-prod
```


## Kubernetes deployment
```
kubectl apply -f .
```
