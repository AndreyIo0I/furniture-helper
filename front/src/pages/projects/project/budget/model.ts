import {Dayjs} from 'dayjs'

export interface ClientPayment {
	paymentId: number
	amount: number | null
	paymentDate: Dayjs | null
}

export interface CostPayment {
	paymentId: number
	costId: number
	amount: number | null
	paymentDate: Dayjs | null
}

export interface ProjectBudget {
	projectCost: number | null
	clientPayments: ClientPayment[]
	costPayments: CostPayment[]
	hasChangesInModel: boolean
}
