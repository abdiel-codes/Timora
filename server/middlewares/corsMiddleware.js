import cors from "cors";

const whiteList = ['http://localhost:5173']

const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin || whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
})

export default corsMiddleware;
