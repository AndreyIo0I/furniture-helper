import {DownOutlined, RightOutlined} from '@ant-design/icons'
import {Checkbox, Collapse, FormControlLabel, TableCell, TableRow} from '@mui/material'
import {Button} from 'antd'
import React from 'react'
import {ProjectBudget} from '../../../../../api/projects/useProjectBudget'
import {Project} from '../../../../../api/projects/useProjects'
import ContractStage, {saveContractStage} from './contract'
import GenericStage, {saveGenericStage} from './generic'
import GroupStage, {saveGroupStage} from './group'
import * as model from './model'
import PaymentStage, {savePaymentStage} from './payment'
import styles from './styles.module.css'

export function saveProjectStage(
	stage: model.ProjectStage,
	contract: model.Contract,
	projectId: number,
	apiBudget: ProjectBudget,
) {
	switch (stage.stageType) {
		case model.StageType.Generic:
			return saveGenericStage(stage, projectId)
		case model.StageType.Group:
			return saveGroupStage(stage, contract, projectId, apiBudget)
		case model.StageType.Contract:
			return saveContractStage(stage, contract, projectId, apiBudget)
		case model.StageType.Payment:
			return savePaymentStage(stage, contract, projectId, apiBudget)
	}
}

interface ProjectStageProps {
	project: Project,
	contract: model.Contract,
	stage: model.ProjectStage,
	setContract: (contract: model.Contract) => void,
	setStage: (stage: model.ProjectStage) => void,
}

export default function ProjectStage(props: ProjectStageProps) {
	const [open, setOpen] = React.useState(false)
	const toggleOpen = () => setOpen(!open)

	function setStage(stage: model.ProjectStage) {
		props.setStage({
			...stage,
			hasChangesInModel: true,
		})
	}

	function setIsCompleted(isCompleted: boolean) {
		setStage({
			...props.stage,
			isCompleted,
		})
	}

	const isGroup = props.stage.stageType === model.StageType.Group
	const collapseHeaderProps = (isCollapsible: boolean, className: string) => (
		isCollapsible ? {
			className: styles.cell_collapse_toggle + ' ' + className,
			onClick: toggleOpen,
		} : {
			className,
		}
	)

	return (
		<>
			<TableRow
				style={{
					background: props.stage.isCompleted ? 'lightgreen' : 'white',
				}}
			>
				<TableCell
					{...collapseHeaderProps(true, styles.col_content_sized)}
				>
					<Button
						type="link"
						icon={open ? <DownOutlined/> : <RightOutlined/>}
					/>
				</TableCell>
				<TableCell
					component="th"
					scope="row"
					{...collapseHeaderProps(true, styles.col_stage_name)}
				>
					{props.stage.name}
				</TableCell>
				<TableCell
					{...collapseHeaderProps(isGroup, styles.col_content_sized)}
				>
					{!isGroup && <FormControlLabel
						control={<Checkbox/>}
						label="Завершить этап"
						labelPlacement="start"
						checked={props.stage.isCompleted}
						onChange={() => setIsCompleted(!props.stage.isCompleted)}
					/>}
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					colSpan={3}
					className={styles.table_cell_collapsible}
					style={isGroup ? {paddingRight: 0} : undefined}
				>
					<Collapse in={open}>
						{props.stage.stageType === model.StageType.Generic && <GenericStage
							stage={props.stage}
							setStage={setStage}
						/>}
						{props.stage.stageType === model.StageType.Group && <GroupStage
							project={props.project}
							contract={props.contract}
							stage={props.stage}
							setContract={props.setContract}
							setStage={setStage}
						/>}
						{props.stage.stageType === model.StageType.Contract && <ContractStage
							project={props.project}
							contract={props.contract}
							stage={props.stage}
							setContract={props.setContract}
							setStage={setStage}
							setOpen={setOpen}
						/>}
						{props.stage.stageType === model.StageType.Payment && <PaymentStage
							contract={props.contract}
							stage={props.stage}
							setContract={props.setContract}
							setStage={setStage}
						/>}
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	)
}
