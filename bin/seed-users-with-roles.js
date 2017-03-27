import server from '~/server/server.js';
import roles from '~/bin/user-roles.json';
import users from '~/bin/users.json';
import {startSeed} from '~/bin/seed-utils.js';

import modelConfig from '~/server/model-config.json';

let mongodbDatasource = server.datasources.mongodb;

export default ()=> {
  return new Promise((resolve, reject)=> {
    let promises = [];
    console.info('Inserting user and roles seed data...');
    promises.push(startSeed('user', users.users));
    promises.push(startSeed('Role', roles.roles));
    Promise.all(promises).then((results)=> {
      promises = [];
      let roleMapping = {};
      let roleMappings = [];
      const userInstances = results[0];
      const roleInstances = results[1];
      for (let index = 0; index < userInstances.length; index++) {
        roleMapping = {};
        roleMapping.principalType = server.models.RoleMapping.USER;
        roleMapping.principalId = userInstances[index].id;
        roleMapping.roleId = roleInstances[index].id;
        roleMappings.push(roleMapping);
      }
      startSeed('RoleMapping', roleMappings).then((roleMappingInstances)=> {
        console.info('User and roles seed data was inserted correctly.');
        resolve();
      }).catch((error)=> {
        reject(error);
      });
    }).catch((error)=> {
      reject(error);
    });
  });
};
