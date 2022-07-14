# health-auth

## Installation

```
1. Clone https- git clone https https://github.com/Jermyhewitt/health-auth.git 
    * or clone over SSH- git clone git@github.com:Jermyhewitt/health-auth.git
2. cd /path/to/project/folder/cloned
3. create a .env file with SECRET="YOURSECRETKEYGOESHERE"
4. npm install
5. npx knex migrate:latest
6. $ npx knex seed:run (Optional needed to seed config table)
7. cd /path/to/MyHealthPass
8. npm install /path/to/project/folder/cloned
```

## Basic Usage

```
import {authenticate,login,register} from "healthpass";

authenticate(jwt); //Returns the data in the token or false if the token is expired or invalid.

login(username, password, signature) 

/*
signature is optional
throws an exception if limits are exceeded or credentials are incorrect.
*/


register({regionId,profilePic userName}, password)

/*
regionId-  is optional in the object above
profilePic-  is also optional. If provided profile pic should be the path of the uploaded image

return the profile that is just created and throws an exception if account exists
*/
```

