import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import ShowProfileService from './ShowProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon.doe@gmail.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Jhon Doe');
    expect(profile.email).toBe('jhon.doe@gmail.com');
  });

  it('should not be able to show a non-existing profile', async () => {
    await expect(
      showProfile.execute({
        user_id: '1234567',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
