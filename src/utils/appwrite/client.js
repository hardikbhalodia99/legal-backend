import { Client, Users, ID } from 'node-appwrite';

const endpoint = process.env.APPWRITE_ENDPOINT;
const project = process.env.APPWRITE_PROJECT_ID;

export async function createAppwriteAccount({name,email,password}){
  try {
    const client = new Client();
    client.setEndpoint(endpoint).setProject(project).setKey(process.env.APPWRITE_SERVER_API_KEY);
    const users = new Users(client);
  
    const newUser = await users.create(ID.unique(), email, '', password, name);
    console.log("%c 🍺 newUser", "color:#4fff4B", newUser);

    return newUser;
  } catch (error) {
    console.error('Server Error at appwrite/client in createAppwriteAccount ==> Error : ', error);
  }
}
