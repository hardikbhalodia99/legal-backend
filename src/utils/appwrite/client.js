const { Client, Users, ID } = require('node-appwrite')

const endpoint = process.env.APPWRITE_ENDPOINT;
const project = process.env.APPWRITE_PROJECT_ID;

async function createAppwriteAccount({name,email,password,type}){
  try {
    const client = new Client();
    client.setEndpoint(endpoint).setProject(project).setKey(process.env.APPWRITE_SERVER_API_KEY);
    const users = new Users(client);
  
    const newUser = await users.create(ID.unique(), email, undefined, password, name);
    console.log("%c 🍺 newUser", "color:#4fff4B", newUser);
    let prefs = {
      "role" : type
    }
   
    let updatedData = await users.updatePrefs(newUser.$id,prefs)

    return {...newUser,prefs : updatedData};
  } catch (error) {
    console.error('Server Error at appwrite/client in createAppwriteAccount ==> Error : ', error);
  }
}

async function enableDisableAppwriteClient({id,type}){
  try {
    const client = new Client();
    client.setEndpoint(endpoint).setProject(project).setKey(process.env.APPWRITE_SERVER_API_KEY);
    const users = new Users(client);
  
    let status = type === "ENABLE" ? true : false
    const updatedUser = await users.updateStatus(id,status)
    console.log("%c 🍪 updatedUser", "color:#6ec1c2", updatedUser);

    return updatedUser;
  } catch (error) {
    console.error('Server Error at appwrite/client in enableDisableAppwriteClient ==> Error : ', error);
  }
}

async function updateAppwriteClientData({id,name,email,phone}){
  try {
    const client = new Client();
    client.setEndpoint(endpoint).setProject(project).setKey(process.env.APPWRITE_SERVER_API_KEY);
    const users = new Users(client);
  
    await users.updateEmail(id,email)
    await users.updateName(id,name)
    let updatedUser = await users.updatePhone(id,phone)

    return updatedUser;
  } catch (error) {
    console.error('Server Error at appwrite/client in updateAppwriteClientData ==> Error : ', error);
  }
}

async function updateAppwriteClientPassword({id,password}){
  try {
    const client = new Client();
    client.setEndpoint(endpoint).setProject(project).setKey(process.env.APPWRITE_SERVER_API_KEY);
    const users = new Users(client);
  
    let updatedUser = await users.updatePassword(id,password)

    return updatedUser;
  } catch (error) {
    console.error('Server Error at appwrite/client in updateAppwriteClientPassword ==> Error : ', error);
  }
}

module.exports.createAppwriteAccount = createAppwriteAccount
module.exports.enableDisableAppwriteClient = enableDisableAppwriteClient;
module.exports.updateAppwriteClientData = updateAppwriteClientData;
module.exports.updateAppwriteClientPassword = updateAppwriteClientPassword;