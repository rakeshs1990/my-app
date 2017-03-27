import seedUsersWithRoles from '~/bin/seed-users-with-roles.js';
export default function() {
  console.info('Checking models for seed data...');

  var promises = [];

  promises.push(seedUsersWithRoles());

  Promise.all(promises).then(function(results) {
    console.info('Seed data was inserted correctly!');
    process.exit();
  }).catch((error)=> {
    console.error(error);
    process.exit(1);
  });
}
