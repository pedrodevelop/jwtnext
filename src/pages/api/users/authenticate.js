import { v4 as uuid } from "uuid";
import { compare } from "bcrypt";

import { connectToDatabase } from "../../../../config/mongodb";

export default async function signIn(req, res) {
  const { db, client } = await connectToDatabase();
  const { email, password } = req.body;

  if (client.connect()) {
    const user = await db.collection("users").findOne({ email: email });
    if (user) {
      const validPassword = await compare(password, user.password);
      if (validPassword) {
        res.status(200).json({
          user: {
            token: uuid(),
            name: user.name,
            email: user.email,
            avatar_url: `https://github.com/${user.githubUser}.png`,
          },
        });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  }
}
