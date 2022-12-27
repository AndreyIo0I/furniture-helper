export interface Cost {
	costId: number,
	name: string,
}

export interface ClientPayment {
	paymentId: number,
	amount: number,
	paymentDate: Date,
}

export interface CostPayment {
	paymentId: number,
	costId: number,
	amount: number,
}

export interface ProjectBudget {
	projectCost: number,
	clientPayments: ClientPayment[],
	costPayments: CostPayment[],
	costs: Cost[],
}
