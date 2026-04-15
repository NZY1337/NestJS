import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Auth Sy stem (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    it('handles the signUp request', () => {
        const email = 'hello1@gmail.com';

        return request(app.getHttpServer())
            .post('/auth/signUp')
            .send({
                email: email,
                password: 'hello',
            })
            .expect(201)
            .then((res) => {
                const { id, email } = res.body;
                expect(id).toBeDefined();
                expect(email).toEqual(email);
            });

    });

    it('signup as a new user then get the current user', async () => {
        const email = 'asd@yahoo.com';

        const res = await request(app.getHttpServer())
            .post('/auth/signUp')
            .send({
                email: email,
                password: 'hello',
            })
            .expect(201);

        const cookie = res.get('Set-Cookie');

        const { body } = await request(app.getHttpServer())
            .get('/auth/whoami')
            .set('Cookie', cookie!)
            .expect(200);

        expect(body.email).toEqual(email);
    });
});
