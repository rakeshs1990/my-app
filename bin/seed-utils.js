import server from '~/server/server.js';
import {modelCreateGeneric} from '~/bin/model-utils.js';

let needsSeed = (model)=> {
  return new Promise((resolve, reject)=> {
    server.models[model].count().then((result)=> {
      if (result > 0) return resolve(false);
      resolve(true);
    }).catch((error)=> {
      reject(error);
    });
  });
};

let startSeed = (model, content)=> {
  return new Promise((resolve, reject)=> {
    needsSeed(model).then((needs)=> {
		  if (needs) {
		  	resolve(modelCreateGeneric(model, content));
		  } else {
		  	reject(`Seed data is already inserted for model ${model}`);
		  }
    }).catch((error)=> {
		  reject(error);
    });
  });
};

export default{
  startSeed: startSeed,
};
