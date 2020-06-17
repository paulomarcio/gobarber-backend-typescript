import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgottenPasswordEmailService from './SendForgottenPasswordEmailService';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgottenPasswordEmailService: SendForgottenPasswordEmailService;

describe('SendForgottenPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();

    sendForgottenPasswordEmailService = new SendForgottenPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
    });

    await sendForgottenPasswordEmailService.execute({
      email: 'john.doe@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be able to recover a non existing user password', async () => {
    await expect(
      sendForgottenPasswordEmailService.execute({
        email: 'john.doe@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgotten password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
    });

    await sendForgottenPasswordEmailService.execute({
      email: 'john.doe@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
