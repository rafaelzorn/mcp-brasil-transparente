import { ProposalRepository } from '@/repositories/ProposalRepository'
import { Proposal, ProposalDetail } from '@/types'
import { NotFoundException } from '@/exceptions/NotFoundException'
import { transformProposals, transformProposalDetails } from '@/transformers'

export class ProposalService {
  constructor(private proposalRepository: ProposalRepository) {}

  public async getProposals(deputyId: number, year: number): Promise<Proposal[]> {
    let page = 1
    let allProposals: Proposal[] = []
    let proposals: Proposal[] = []

    do {
      const params = new URLSearchParams({
        ...(deputyId && { idDeputadoAutor: deputyId.toString() }),
        ...(year && { ano: year.toString() }),
        ...({ ordenarPor: 'numero', pagina: page.toString() })
      });

      const apiProposals = await this.proposalRepository.getProposals(params)

      proposals = transformProposals(apiProposals)

      allProposals.push(...proposals)

      page++
    } while (proposals.length > 0)

    if (allProposals.length === 0) {
      throw new NotFoundException('Nenhuma proposta encontrada para o deputado.')
    }

    return allProposals
  }

  public async getProposal(id: number): Promise<ProposalDetail> {
    const apiProposal = await this.proposalRepository.getProposal(id)

    const proposal = transformProposalDetails(apiProposal)

    return proposal
  }
}
