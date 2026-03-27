import { FetchErrorException } from "@/exceptions/FetchErrorException";
import type { ApiDeputyExpensesResponse } from "@/types";

export class DeputyExpenseRepository {
	public async getDeputyExpenses(
		deputyId: number,
		params: URLSearchParams,
	): Promise<ApiDeputyExpensesResponse> {
		const response = await fetch(
			`${process.env.API_URL}/deputados/${deputyId}/despesas?${params}`,
		);

		if (!response.ok) {
			throw new FetchErrorException(
				"Ops... Erro ao buscar despesas do deputado.",
			);
		}

		const data = await response.json();

		return data.dados;
	}
}
