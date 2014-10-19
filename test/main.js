var app = require('../server');
var request = require('supertest').agent(app.listen());

describe('ajaxtest', function(){
  it('/test', function(done){
    request
    .post('/test')
    .send({ name: 'Manny', species: 'cat' })
    .expect(200)
    .expect('{"name":"Manny","species":"cat"}', done);
  });
});