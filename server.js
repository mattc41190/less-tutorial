const Hapi = require('hapi');
const Inert = require('inert');
const PORT = 3000;

const server = new Hapi.Server({port: PORT});

async function init() {

  try {
    await server.register({
      plugin: Inert
    });
  } catch (e) {
    console.log(e);
  }

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public',
        listing: true
      }
    }
  });

  try {
    await server.start()
    console.log(`Server Started @ ${server.info.uri}`);
  } catch (err) {
    console.log(err)
  }
}

init();
