/**
 * @mixin CreateRelationedModels
 * @param {Object} Model - Instance of the model to wich the mixin is injected
 * @param {Object} options - Options for the mixin
 * @description A mixin function to use on the model definition of any model,
 * this mixin create to database collections related to a model, example:
    "CreateRelationedModels":{
      "models":[
        {"name":"UserProfile","addModelId":true}
      ]
    }
 * models represents an array of objects in wich [name](string) is the name of a model
 * and [addModelId](boolean) represents if  that modal should have the id of a parent(The model this mixin was injected on).
 */
export default (Model, options)=> {
  let firstToUpperCase = (modelName)=> {
    return modelName.substr(0, 1).toUpperCase() + modelName.substr(1);
  };

  let firstToLowerCase = (modelName)=> {
    return modelName.substr(0, 1).toLowerCase() + modelName.substr(1);
  };

  let checkFirstLetterIsLowerCase = (modelName)=> {
    var first = modelName.charAt(0);
    if (first === first.toLowerCase() && first !== first.toUpperCase())
      return true;
    return false;
  };

  Model.afterRemote('create', (context, model, next)=> {
    let body = context.req.body;
    const modelsToCreate = options.models;
    const models = Model.app.models;
    let promises = [];
    const modelName = firstToLowerCase(Model.definition.name);

    for (let i = 0; i < modelsToCreate.length; i++) {
      const modelToCreate = modelsToCreate[i];
      const modelToCreateName = modelToCreate.name;
      const modelToCreateUpper = firstToUpperCase(modelToCreateName);
      const bodyContainsProperty = body.hasOwnProperty(modelToCreateName) ||
      body.hasOwnProperty(modelToCreateUpper);

      if (bodyContainsProperty) {
        let data = body[modelToCreateName] || body[modelToCreateUpper];
        let modelNameParsed;
        if (modelToCreate.addModelId) data[`${modelName}Id`] = model.id;

        promises.push(models[modelToCreateName].create(data));
      }
    }

    Promise.all(promises).then((results)=>{
      next(null, results);
    }).catch((error)=>{
      next(error);
    });
  });
};
