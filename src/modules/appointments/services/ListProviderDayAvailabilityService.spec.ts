import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppoinetmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppoinetmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppoinetmentsRepository
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppoinetmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppoinetmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user_id',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ])
    );
  });
});
