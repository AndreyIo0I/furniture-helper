import {Dayjs} from 'dayjs'

export interface ClientPayment {
	paymentId: number
	amount?: number
	paymentDate: Dayjs | null
}

export interface CostPayment {
	paymentId: number
	costId: number
	amount?: number
	paymentDate: Dayjs | null
}

export interface ProjectBudget {
	projectCost?: number
	clientPayments: ClientPayment[]
	costPayments: CostPayment[]
}
