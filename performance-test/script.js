import { check } from "k6";
import http from "k6/http";

export const options = {
  scenarios: {
    ci_peak: {
      executor: "constant-arrival-rate",
      rate: 6,
      timeUnit: "1s",
      duration: "3m",
      preAllocatedVUs: 70,
      maxVUs: 100,
    },
  },
};

export default () => {
  const url = `http://172.18.0.4:8080/api/`;

  const payload = JSON.stringify({
    time: new Date()
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  console.log('#####Hit Pod#####: ' + res.headers['X-Pod-Name']);
  check(res, {
    "response code was 200": () => res.status === 200,
  });
};