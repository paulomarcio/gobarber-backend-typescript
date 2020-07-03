import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppoinetmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppoinetmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppoinetmentsRepository
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppoinetmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 3, 20, 8, 0, 0),
    });

    await fakeAppoinetmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppoinetmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppoinetmentsRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 22, available: true },
      ])
    );
  });
});