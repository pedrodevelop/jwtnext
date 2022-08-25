import { connectToDatabase } from "../../../../config/mongodb";

export default async function recoverUserInfo(req, res) {
  const { db, client } = await connectToDatabase();
  const { githubUser } = req.body;

  if (client.connect()) {
    const user = await db.collection("users").findOne({ githubUser: githubUser });
    if (user) {
      res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
          avatar_url: `https://github.com/${user.githubUser}.png`,
        },
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }
}
