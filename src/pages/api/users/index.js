import { connectToDatabase } from '../../../../config/mongodb';

export default async function getUsers(req, res) {
  const {db, client} = await connectToDatabase();

  if(client.connect()) {
    const users = await db
    .collection('users')
    .find({})
    .toArray()

    if(users) {
      return res.status(200).json({users: users})
    }
  }

  return res.status(500).json({ error: 'client DB is not connected' })
}