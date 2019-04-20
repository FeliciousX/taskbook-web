import request from 'supertest';
import server from '../server';

describe('Examples', () => {
  afterAll(() => {
    server.close();
  });

  test('should get all examples', () =>
    request(server.app)
      .get('/api/v1/examples')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body).toBeInstanceOf(Array);
        expect(r.body).toHaveLength(2);
      }));
  test('should add a new example', () =>
    request(server.app)
      .post('/api/v1/examples')
      .send({ name: 'test' })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body).toHaveProperty('name');
        expect(r.body.name).toBe('test');
      }));

  test('should get an example by id', () =>
    request(server.app)
      .get('/api/v1/examples/2')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body).toHaveProperty('name');
        expect(r.body.name).toBe('test');
      }));
});
