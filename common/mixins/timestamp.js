export default (Model, options)=> {
  Model.beforeRemote('create', (context, model, next)=> {
    let instance = context.req.body;
    instance.created     = Date.now();
    instance.modified = Date.now();
    next();
  });

  Model.observe('before save', (context, next)=> {
    if (!context.isNewInstance && context.currentInstance != undefined) {
      let data = context.data;
      data.modified = Date.now();
    }
    next(null, context);
  });
};
