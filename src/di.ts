import { DeputyRepository } from '@/repositories/DeputyRepository'
import { DeputyService } from '@/services/DeputyService'

export type ApplicationDependencies = {
  deputyService: DeputyService
}

export function createApplicationDependencies(): ApplicationDependencies {
  const deputyRepository = new DeputyRepository()
  const deputyService = new DeputyService(deputyRepository)

  return { deputyService }
}
