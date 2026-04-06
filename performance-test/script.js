import { check } from "k6";
import http from "k6/http";

export const options = {
  vus: 10,
  iterations: 40
  // stages: [
  //   { duration: '5m', target: 50},
  //   { duration: '30m', target: 100},
  //   { duration: '5m', target: 0},
  // ]
}

export default () => {
  const url = `http://172.18.0.4:8080/api/`;
  // const url = `http://localhost:8080/api/`;

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.get(url, params);

  // check(res, {
  //   "response code was 200": () => res.status === 200,
  // });
};