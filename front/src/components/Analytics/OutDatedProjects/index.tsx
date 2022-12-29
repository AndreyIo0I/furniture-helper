import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { OutdatedProjects } from '../../../../api/useAnalytics'
import styles from './styles.module.css'

export interface OutDatedProjectsProps {
	text: string
}

export function OutDatedProjectsComponent(props: OutdatedProjects) {
	if (!props.outdatedProjects || props.outdatedProjects.length === 0)
	{
		return (
			<><h3>Не найдено данных по текущим фильтрам</h3></>
		)
	}

	return (
		<div className={styles.container}>
			<div>Среднее количество просроченных дней: {props?.averageAmount || 0}</div>
			{ props?.period
				 && <div>
						<h4>Период</h4>
						<div>{`С ${props.period.startDate.format('DD/MM/YYYY')} по ${props.period.endDate.format('DD/MM/YYYY')}`}</div>
					</div>
			}
			{
				props?.outdatedProjects && props.outdatedProjects.length > 0
					&& <TableContainer
							component={Paper}
							sx={{
								maxWidth: '1440px',
								margin: 'auto',
							}}
						>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Дата начала проекта</TableCell>
										<TableCell align="right">Дедлайн</TableCell>
										<TableCell align="right">Название проекта</TableCell>
										<TableCell align="right">Кол-во просроченных дней</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{props.outdatedProjects && props.outdatedProjects.map((row, index) => (
										<TableRow
											key={index}
											className={styles.row}
										>
											<TableCell component="th" scope="row">
												{row.startDate.format('DD/MM/YYYY')}
											</TableCell>
											<TableCell align="right">{row.deadLine.format('DD/MM/YYYY')}</TableCell>
											<TableCell align="right">{row.name}</TableCell>
											<TableCell align="right">{row.wastedDays}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
			}
		</div>
	)
}
