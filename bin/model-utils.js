import server from '~/server/server.js';

let modelCreateGeneric = (model, content)=> {
  let promises = [];
  if (!content instanceof Object && !content instanceof Array) {
    throw new Error('Model content must be of type Array or Object');
  }
  return new Promise((resolve, reject)=> {
    if (content instanceof Array) {
      for (let index = 0; index < content.length; index++) {
        content[index].created = new Date();
        content[index].modified = new Date();
        promises.push(server.models[model].create(content[index]));
      }
    } else {
      promises.push(server.models[model].create(content));
    }

	  Promise.all(promises).then((results)=> {
	  	resolve(results);
	  }).catch((error)=> {
	  	reject(error);
	  });
  });
};

export default{
  modelCreateGeneric: modelCreateGeneric,
};
