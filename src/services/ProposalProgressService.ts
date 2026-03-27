import { ProposalProgressRepository } from '@/repositories/ProposalProgressRepository'
import { ProposalProgress } from '@/types'
import { transformProposalProgresses } from '@/transformers'

export class ProposalProgressService {
  constructor(private proposalProgressRepository: ProposalProgressRepository) {}

  public async getProposalProgresses(proposalId: number): Promise<ProposalProgress[]> {
    const apiProposalProgresses = await this.proposalProgressRepository.getProposalProgresses(proposalId)

    const proposalProgresses = transformProposalProgresses(apiProposalProgresses)

    return proposalProgresses
  }
}
