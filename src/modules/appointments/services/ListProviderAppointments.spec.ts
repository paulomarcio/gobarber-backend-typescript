import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppoinetmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppoinetmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppoinetmentsRepository
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppoinetmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppoinetmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider_id',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
