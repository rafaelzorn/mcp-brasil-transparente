import type {
	ApiDeputiesResponse,
	ApiDeputyDetailsResponse,
	ApiDeputyExpensesResponse,
	ApiProposalDetailsResponse,
	ApiProposalProgressesResponse,
	ApiProposalsResponse,
	DeputiesFetcherResult,
	DeputyDetailsFetcherResult,
	DeputyExpensesFetcherResult,
	ProposalDetailsFetcherResult,
	ProposalProgressesFetcherResult,
	ProposalsFetcherResult,
} from "@/types";

export function transformDeputies(
	apiDeputies: ApiDeputiesResponse,
): DeputiesFetcherResult {
	return apiDeputies.map((deputy) => ({
		id: deputy.id,
		name: deputy.nome,
		party: deputy.siglaPartido,
		state: deputy.siglaUf,
	}));
}

export function transformDeputyDetails(
	apiDeputy: ApiDeputyDetailsResponse,
): DeputyDetailsFetcherResult {
	const lastStatus = apiDeputy.ultimoStatus;
	const office = lastStatus.gabinete;

	return {
		id: apiDeputy.id,
		nameCivil: apiDeputy.nomeCivil,
		lastStatus: {
			name: lastStatus.nome,
			party: lastStatus.siglaPartido,
			state: lastStatus.siglaUf,
			electoralName: lastStatus.nomeEleitoral,
			office: {
				name: office.nome,
				building: office.predio,
				room: office.sala,
				phone: office.telefone,
				email: office.email,
			},
			status: lastStatus.situacao,
			electoralCondition: lastStatus.condicaoEleitoral,
		},
		cpf: apiDeputy.cpf,
		socialMedia: apiDeputy.redeSocial,
		birthDate: apiDeputy.dataNascimento,
		deathDate: apiDeputy.dataFalecimento,
		birthState: apiDeputy.ufNascimento,
		birthCity: apiDeputy.municipioNascimento,
		education: apiDeputy.escolaridade,
	};
}

export function transformDeputyExpenses(
	apiDeputyExpenses: ApiDeputyExpensesResponse,
): DeputyExpensesFetcherResult {
	return apiDeputyExpenses.map((deputyExpense) => ({
		typeExpense: deputyExpense.tipoDespesa,
		providerName: deputyExpense.nomeFornecedor,
		providerCnpjCpf: deputyExpense.cnpjCpfFornecedor,
		documentDate: deputyExpense.dataDocumento,
		documentValue: deputyExpense.valorDocumento,
		urlDocument: deputyExpense.urlDocumento,
	}));
}

export function transformProposals(
	apiProposals: ApiProposalsResponse,
): ProposalsFetcherResult {
	return apiProposals.map((proposal) => ({
		id: proposal.id,
		proposal: `${proposal.siglaTipo} ${proposal.numero}/${proposal.ano}`,
		presentationDate: proposal.dataApresentacao,
		summary: proposal.ementa,
	}));
}

export function transformProposalDetails(
	apiProposal: ApiProposalDetailsResponse,
): ProposalDetailsFetcherResult {
	const statusProposal = apiProposal.statusProposicao;

	return {
		id: apiProposal.id,
		proposal: `${apiProposal.siglaTipo} ${apiProposal.numero}/${apiProposal.ano}`,
		summary: apiProposal.ementa,
		urlDocument: apiProposal.urlInteiroTeor,
		statusProposal: {
			dateTime: statusProposal.dataHora,
			statusSituation: statusProposal.descricaoSituacao,
			descriptionSituation: statusProposal.descricaoTramitacao,
			dispatch: statusProposal.despacho,
		},
	};
}

export function transformProposalProgresses(
	apiProposalProgresses: ApiProposalProgressesResponse,
): ProposalProgressesFetcherResult {
	return apiProposalProgresses.map((proposalProgress) => ({
		statusSituation: proposalProgress.descricaoSituacao,
		descriptionSituation: proposalProgress.descricaoTramitacao,
		dispatch: proposalProgress.despacho,
		dateTime: proposalProgress.dataHora,
	}));
}
