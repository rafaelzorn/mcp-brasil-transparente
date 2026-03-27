import dotenv from 'dotenv'
import { DeputyRepository } from '@/repositories/DeputyRepository'
import { DeputyService } from '@/services/DeputyService'

export type ApplicationDependencies = {
  deputyService: DeputyService
}

export function createApplicationDependencies(): ApplicationDependencies {
  dotenv.config()

  const deputyRepository = new DeputyRepository()
  const deputyService = new DeputyService(deputyRepository)

  return { deputyService }
}
