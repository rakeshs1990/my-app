
export default (server)=> {
  let mongodbDatasource = server.datasources.mongodb;

  mongodbDatasource.autoupdate((error, result)=> {
    if (error) throw error;
  });
};
