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
- nginx runs on port 80
- -p localPort:containerPort

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

Start a IP route network locally
```
sudo cloud-provider-kind
```