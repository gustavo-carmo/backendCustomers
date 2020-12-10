npm run-script build
npm run-script typeorm migration:run
node dist/shared/infra/http/server.js
