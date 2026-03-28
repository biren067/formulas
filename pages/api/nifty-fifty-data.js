// /pages/api/data.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "assets", "ind_nifty50list.csv");
  const file = fs.readFileSync(filePath, "utf8");
  res.status(200).send(file);
}
