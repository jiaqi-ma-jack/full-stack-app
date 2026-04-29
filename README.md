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


## Performance test job
Build
```
docker build -t performance-test-prod .
```

Run
```
docker run performance-test-prod
```

Load the image into the cluster
```
kind load docker-image performance-test-prod
```

View logs after creating the job
```
kubectl logs job/performance-test-job
```


## Kubernetes deployment
```
kubectl apply -f .
```

Start a IP route network locally
```
sudo cloud-provider-kind
```


## K6 Operator
```
kubectl create configmap my-k6-test --from-file "../performance-test/script.js"
```

```
kubectl apply -f k6-resource.yaml
```

k6 operators run on separate pods. To view logs:
```
kubectl logs -f k6-sample-1-5thtf
```


## Horizontal Pod Autoscaler
Ensure all container specs include resources.requests.cpu.
Ensure Kubernetes [Metrics Server](https://github.com/kubernetes-sigs/metrics-server#readme) is running.

```
kubectl autoscale deployment backend-deployment --cpu=50% --min=1 --max=10
```

Check current hpa(horizontalPodAutoscaler) status:
```
kubectl get hpa
```
```
kubectl get hpa <hpa_name> --watch
```

Check metrics server availibility:
```
kubectl get apiservice v1beta1.metrics.k8s.io
```

## Vertical Pod Autoscaler
