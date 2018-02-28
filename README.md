# Usage :  

Add the dependency in global  :

`` npm i -g global-link``

Go to the project you need to link :
 
Then launch : 

`` global-link add`` (To add an aliased project)

`` global-link remove`` (To remove an aliased project)

Once a project is linked you need to add some conf to your webpack conf project : 
 
- add the dependency : global-link
 
````javascript
const globalLink = require('global-link');
const alias = globalLink.getAliases();

//... Your conf
    resolve : {
        alias
    }
//...
// if you have some ts-loader with external typescript projects 
// in the include you need to change the includes
````