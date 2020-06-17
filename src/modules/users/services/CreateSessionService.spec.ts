import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import CreateSessionService from './CreateSessionService';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let createSession: CreateSessionService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to create a session', async () => {
    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhon.doe@gmail.com',
      password: '123456',
    });

    const $response = await createSession.execute({
      email: 'jhon.doe@gmail.com',
      password: '123456',
    });

    expect($response).toHaveProperty('token');
    expect($response.user).toEqual(user);
  });

  it('should not be able to create a session with a non existing user', async () => {
    await expect(
      createSession.execute({
        email: 'jhon.doe@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a session with wrong password', async () => {
    await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhon.doe@gmail.com',
      password: '123456',
    });

    await expect(
      createSession.execute({
        email: 'jhon.doe@gmail.com',
        password: '1234567',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
