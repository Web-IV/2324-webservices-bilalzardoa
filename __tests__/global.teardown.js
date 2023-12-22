const { shutdownData, getKnex, tables } = require('../app/src/data'); // 👈 2 en 3

// 👇 1
module.exports = async () => {
  // Remove any leftover data
  await getKnex()(tables.activity).delete(); // 👈 2
  await getKnex()(tables.journal).delete(); // 👈 2
  await getKnex()(tables.users).delete(); // 👈 2
  //await getKnex()(tables.activity).delete(); // 👈 2

  // Close database connection
  await shutdownData(); // 👈 3
};