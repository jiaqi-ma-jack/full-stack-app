import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { Length, IsString } from "class-validator";
import cors from "cors";
import { plainToClass } from "class-transformer";

const app = express();

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
  res.contentType("application/json");
  res.status(200);
  res.send(responseBody);
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
