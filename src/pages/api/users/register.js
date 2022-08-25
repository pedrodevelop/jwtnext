import { connectToDatabase } from '../../../../config/mongodb';
import { genSalt, hash} from 'bcrypt';


export default async function signUp(req, res) {
  const { db, client } = await connectToDatabase();
  const { name, githubUser, email, password } = req.body;

  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt)

  if(client.connect()) {
    const user = await db
    .collection('users')
    .insert({
      name: name,
      githubUser: githubUser,
      email: email,
      password: hashedPassword
    })
    
    res.status(200).json({user: user})
  }

  return res.status(500).json({ error: 'client DB is not connected' })
}
