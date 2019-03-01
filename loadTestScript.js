import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1,
  duration: "5s"
};

export default function() {

  var id = Math.floor(Math.random() * 10000);
  console.log("ID used: "+id);

  var url = "http://petstore.swagger.io/v2/pet";
  var payload = JSON.stringify({ id: id, name: "Grumpy Cat" });
  var params =  { headers: { "Content-Type": "application/json" } }
  let postRes = http.post(url, payload, params);
  check(postRes, {
    "post status is 200": (r) => r.status == 200,
    "post transaction time is OK": (r) => r.timings.duration < 200
  });
  sleep(1);

  let getRes = http.get("http://petstore.swagger.io/v2/pet/"+id);
  check(getRes, {
    "get status is 200": (r) => r.status == 200,
    "get transaction time is OK": (r) => r.timings.duration < 200
  });
  sleep(1);

  var url = "http://petstore.swagger.io/v2/pet";
  var payload = JSON.stringify({ id: id, name: "Droopy Dog" });
  var params =  { headers: { "Content-Type": "application/json" } }
  let putRes = http.put(url, payload, params);
  check(putRes, {
    "put status is 200": (r) => r.status == 200,
    "put transaction time is OK": (r) => r.timings.duration < 200
  });
  sleep(1);

  let delRes = http.del("http://petstore.swagger.io/v2/pet/"+id);
  check(delRes, {
    "delete status is 200": (r) => r.status == 200,
    "delete transaction time is OK": (r) => r.timings.duration < 200
  });
  sleep(1);

};