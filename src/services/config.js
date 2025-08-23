import axios from "axios";

const BASE_URL = "https://movienew.cybersoft.edu.vn/api";

export const axiosCustom = axios.create({
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NiIsIkhldEhhblN0cmluZyI6IjAxLzA0LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NTAwMTYwMDAwMCIsIm5iZiI6MTc0OTkyNDAwMCwiZXhwIjoxNzc1MTUyODAwfQ.nWTdDrnG6ew_ZQC1Qs2JRbFfYRi3jRjLpK7U3uNYfwc",
  },
  baseURL: BASE_URL,
});

// "taiKhoan": "long",
//     "matKhau": "long",
