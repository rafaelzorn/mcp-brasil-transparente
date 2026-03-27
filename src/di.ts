import dotenv from 'dotenv'
import { DeputyRepository } from '@/repositories/DeputyRepository'
import { DeputyService } from '@/services/DeputyService'
import { DeputyExpenseRepository } from '@/repositories/DeputyExpenseRepository'
import { DeputyExpenseService } from '@/services/DeputyExpenseService'
import { ProposalRepository } from '@/repositories/ProposalRepository'
import { ProposalService } from '@/services/ProposalService'

export type ApplicationDependencies = {
  deputyService: DeputyService
  deputyExpenseService: DeputyExpenseService
  proposalService: ProposalService
}

export function createApplicationDependencies(): ApplicationDependencies {
  dotenv.config()

  const deputyRepository = new DeputyRepository()
  const deputyService = new DeputyService(deputyRepository)

  const deputyExpenseRepository = new DeputyExpenseRepository()
  const deputyExpenseService = new DeputyExpenseService(deputyExpenseRepository)

  const proposalRepository = new ProposalRepository()
  const proposalService = new ProposalService(proposalRepository)

  return { deputyService, deputyExpenseService, proposalService }
}
