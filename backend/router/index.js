module.exports = [{
  method: ['*'],
  path: '/{any*}',
  options: {
    tags: ['api'],
    description: 'End-point Not found',
    notes: 'Catch all endpoint that no match before',
    handler: (request, h) => h.response({
      message: 'Endpoint não encontrado',
    }).code(404),
  },
}];
