import { NotFoundException } from "@/exceptions/NotFoundException";
import type { DeputyRepository } from "@/repositories/DeputyRepository";
import { transformDeputies, transformDeputyDetails } from "@/transformers";
import type { Deputy, DeputyDetail } from "@/types";

export class DeputyService {
	constructor(private deputyRepository: DeputyRepository) {}

	public async getDeputies(
		name?: string,
		state?: string,
		party?: string,
	): Promise<Deputy[]> {
		let page = 1;
		const allDeputies: Deputy[] = [];
		let deputies: Deputy[] = [];

		do {
			const params = new URLSearchParams({
				...(name && { nome: name }),
				...(state && { siglaUf: state }),
				...(party && { siglaPartido: party }),
				...{ ordenarPor: "nome", pagina: page.toString() },
			});

			const apiDeputies = await this.deputyRepository.getDeputies(params);

			deputies = transformDeputies(apiDeputies);

			allDeputies.push(...deputies);

			page++;
		} while (deputies.length > 0);

		if (allDeputies.length === 0) {
			throw new NotFoundException("Nenhum deputado encontrado.");
		}

		return allDeputies;
	}

	public async getDeputy(id: number): Promise<DeputyDetail> {
		const apiDeputy = await this.deputyRepository.getDeputy(id);

		const deputy = transformDeputyDetails(apiDeputy);

		return deputy;
	}
}
