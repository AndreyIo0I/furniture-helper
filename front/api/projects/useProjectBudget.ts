import useSWR, {SWRResponse} from 'swr'
import {projectBudgetApi} from '../api'
import {ProjectBudgetDto} from '../typescript-fetch-client-generated'
import useAuthenticatedSWR from '../useAuthenticatedSWR'

export interface ClientPayment {
	paymentDate: Date,
	amount: number,
}

interface CostPayment {
	costId: number,
	paymentDate: Date,
	amount: number,
}

export interface ProjectBudget {
	projectId: number,
	projectCost: number,
	clientPayments: ClientPayment[],
	costPayments: CostPayment[],
}

const mapProjectBudgetDto = (dto: ProjectBudgetDto): ProjectBudget => ({
	projectId: dto.projectId!,
	projectCost: dto.projectCost!,
	clientPayments: dto.clientPayments!.map(payment => ({
		paymentDate: payment.paymentDate!,
		amount: payment.amount!,
	})),
	costPayments: dto.costPayments!.map(payment => ({
		costId: payment.costId!,
		paymentDate: payment.paymentDate!,
		amount: payment.amount!,
	})),
})

export default function useProjectBudget(projectId: number): SWRResponse<ProjectBudget> {
	return useAuthenticatedSWR(
		useSWR(
			'useProjectBudget' + projectId,
			async () => mapProjectBudgetDto(await projectBudgetApi.projectBudgetsProjectIdGet(projectId)),
		),
	)
}
