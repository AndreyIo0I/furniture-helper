import {Dayjs} from 'dayjs'
import {ContractForm} from '../../../../components/Contract'

export interface Contract {
	form?: ContractForm,
}

export enum StageType {
	Generic,
	Group,
	Contract,
	Payment,
}

interface Stage {
	id: number,
	name: string,
	isCompleted: boolean,
	hasChangesInModel: boolean,
}

export type GenericStage = Stage & {
	stageType: StageType.Generic,
	completedOn: Dayjs,
	description: string,
}

export type GroupStage = Stage & {
	stageType: StageType.Group,
	stages: ProjectStage[],
}

export type ContractStage = Stage & {
	stageType: StageType.Contract,
	completedOn: Dayjs,
	description: string,
}

export type PaymentStage = Stage & {
	stageType: StageType.Payment,
	completedOn: Dayjs,
	description: string,
}

export type ProjectStage = GenericStage | GroupStage | ContractStage | PaymentStage
