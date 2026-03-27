import dotenv from 'dotenv'
import { DeputyRepository } from '@/repositories/DeputyRepository'
import { DeputyService } from '@/services/DeputyService'
import { DeputyExpenseRepository } from '@/repositories/DeputyExpenseRepository'
import { DeputyExpenseService } from '@/services/DeputyExpenseService'

export type ApplicationDependencies = {
  deputyService: DeputyService
  deputyExpenseService: DeputyExpenseService
}

export function createApplicationDependencies(): ApplicationDependencies {
  dotenv.config()

  const deputyRepository = new DeputyRepository()
  const deputyService = new DeputyService(deputyRepository)

  const deputyExpenseRepository = new DeputyExpenseRepository()
  const deputyExpenseService = new DeputyExpenseService(deputyExpenseRepository)

  return { deputyService, deputyExpenseService }
}
