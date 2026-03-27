import type { ProposalProgressRepository } from "@/repositories/ProposalProgressRepository";
import { transformProposalProgresses } from "@/transformers";
import type { ProposalProgress } from "@/types";

export class ProposalProgressService {
	constructor(private proposalProgressRepository: ProposalProgressRepository) {}

	public async getProposalProgresses(
		proposalId: number,
	): Promise<ProposalProgress[]> {
		const apiProposalProgresses =
			await this.proposalProgressRepository.getProposalProgresses(proposalId);

		const proposalProgresses = transformProposalProgresses(
			apiProposalProgresses,
		);

		return proposalProgresses;
	}
}
