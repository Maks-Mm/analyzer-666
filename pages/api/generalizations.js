import dbConnect from "../../lib/mongodb";
import AG from "../../models/AG";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const data = await AG.find({});
    console.log(data,"data")
    res.json(data);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
