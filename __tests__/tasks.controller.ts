import request from 'supertest'
import { appTask } from '../server'

describe('Tasks', () => {
  test('should get all tasks', () => {
    return appTask.run().then(app =>
      request(app)
        .get('/api/v1/tasks')
        .expect('Content-Type', /json/)
        .then(r => {
          expect(r.body).toBeInstanceOf(Array)
          expect(r.body).toHaveLength(0)
        })
    )
  })
})

