export interface ClientPayment {
	paymentId: number
	amount?: number
	paymentDate: Date | null
}

export interface CostPayment {
	paymentId: number
	costId: number
	amount?: number
	paymentDate: Date | null
}

export interface ProjectBudget {
	projectCost?: number
	clientPayments: ClientPayment[]
	costPayments: CostPayment[]
}
