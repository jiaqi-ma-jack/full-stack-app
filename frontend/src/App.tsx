import React, { useState } from "react";
import "./App.css";
import { Length, IsString } from "class-validator";
import { plainToClass } from "class-transformer";

class ResponseBody {
  @Length(1, 100)
  @IsString()
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

class RequestBody {
  time: Date;

  constructor(time: Date) {
    this.time = time;
  }
}

function App() {
  const responseBody: ResponseBody = { message: "No response yet" };
  const [response, setResponse] = useState<ResponseBody>(responseBody);

  async function handleJsonFromApi(json: any) {
    let body = plainToClass(ResponseBody, json as Object);
    setResponse(body);
  }

  async function fetchApi() {
    const requestBody: RequestBody = new RequestBody(new Date());

    try {
      const response = await fetch(`http://backend-service:8080/api/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      if (response.status === 200) {
        response.json().then(handleJsonFromApi);
      } else {
        setResponse({ message: "The server denied request." });
      }
    } catch (e) {
      setResponse({ message: "Failed calling the backend." });
    }
  }

  return (
    <div className="App">
      <button onClick={() => fetchApi()}>Call Backend</button>
      <br />
      <textarea
        readOnly={true}
        style={{ height: "200px" }}
        value={response.message}
      ></textarea>
    </div>
  );
}

export default App;
