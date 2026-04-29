import express, {
  Request,
  RequestHandler,
  Response,
} from "express";
import { Length, IsString } from "class-validator";
import cors from "cors";
import { plainToClass } from "class-transformer";

const app = express();
const os = require("os");

class RequestBody {
  time: Date;

  constructor(time: Date) {
    this.time = time;
  }
}

class ResponseBody {
  @IsString()
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

// Enable cors to be able to reach the backend on localhost:8080 while running React.js in dev mode on localhost:3000
// You might want to disbale this on production.
app.use(cors());
app.use(express.json() as RequestHandler);

app.post("/api", async function (req: Request, res: Response) {
  let body = plainToClass(RequestBody, req.body as Object);
  console.log("Received frontend request");
  const responseBody: ResponseBody = new ResponseBody(
    "Frontend sent request at: " + new Date(body.time).toString()
  );
  const hostname = os.hostname();
  res.set("X-Pod-Name", hostname);
  res.contentType("application/json");
  res.status(200);
  res.send(responseBody);
});

app.get("/concurrency", async function (req: Request, res: Response) {
  const urls = [
    "https://status.snyk.io/",
    "https://www.githubstatus.com/",
    "https://confluence.status.atlassian.com/",
    "https://status.datadoghq.com/",
    "https://status.circleci.com/",
    "https://do-not-exist.com/",
  ];

  const results = await Promise.allSettled(urls.map((url) => fetch(url)));

  let responseBody: {
    success: string[];
    failed: string[];
  } = {
    success: [],
    failed: [],
  };
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      responseBody.success.push(`Success: ${result.value.url}`);
    } else {
      responseBody.failed.push(`Failed: ${result.reason}`);
    }
  });

  res.status(200);
  res.send(responseBody);
});

app.get("/sequence", async function (req: Request, res: Response) {
  const urls = [
    "https://status.snyk.io/",
    "https://www.githubstatus.com/",
    "https://confluence.status.atlassian.com/",
    "https://status.datadoghq.com/",
    "https://status.circleci.com/",
    "https://do-not-exist.com/",
  ];

  let responseBody: {
    success: string[];
    failed: string[];
  } = {
    success: [],
    failed: [],
  };
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        responseBody.success.push(`Success: ${url}`);
      }
    } catch (error) {
      responseBody.failed.push(`Failed: ${url} ${error}`);
    }
  }

  res.status(200);
  res.send(responseBody);
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
