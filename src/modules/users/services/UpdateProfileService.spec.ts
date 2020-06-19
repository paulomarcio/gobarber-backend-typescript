import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon.doe@gmail.com',
      password: '123456',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jane Doe',
      email: 'jane.doe@gmail.com',
    });

    expect(updateUser.name).toBe('Jane Doe');
    expect(updateUser.email).toBe('jane.doe@gmail.com');
  });

  it('should not be able to update a non-existent profile', async () => {
    await expect(
      updateProfile.execute({
        user_id: '1234567',
        name: 'Jane Doe',
        email: 'jane.doe@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane.doe@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon.doe@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jane Doe',
        email: 'jane.doe@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon.doe@gmail.com',
      password: '123456',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jane Doe',
      email: 'jane.doe@gmail.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updateUser.password).toBe('123123');
  });

  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon.doe@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jane Doe',
        email: 'jane.doe@gmail.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon.doe@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jane Doe',
        email: 'jane.doe@gmail.com',
        old_password: 'wrongpassword',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
