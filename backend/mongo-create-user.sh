mongo --authenticationDatabase admin -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} <<EOF

use ${MONGO_DATABASE_NAME};

db.createUser({
  user: "${MONGO_USER}",
  pwd: "${MONGO_USER_PASSWORD}",
  roles: [
    { role: "readWrite", db: "${MONGO_DATABASE_NAME}" }
  ],
});
EOF