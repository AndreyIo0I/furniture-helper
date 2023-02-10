import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import {ProjectsMargin} from '../../../../api/useAnalytics'
import styles from './styles.module.css'

export default function MarginComponent(props: ProjectsMargin) {
	if (!props.projectMargins || props.projectMargins.length === 0) {
		return (
			<><h3>Не найдено данных по текущим фильтрам</h3></>
		)
	}

	return (
		<div className={styles.container}>
			<div>Общая маржа: {props?.totalMargin || 0}</div>
			{props?.period
				&& <div>
					<h4>Период</h4>
					<div>{`С ${props.period.startDate.format('DD/MM/YYYY')} по ${props.period.endDate.format('DD/MM/YYYY')}`}</div>
				</div>
			}
			{
				props?.projectMargins && props.projectMargins.length > 0
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
								<TableCell align="right">Тип проекта</TableCell>
								<TableCell align="right">Маржа</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{props.projectMargins && props.projectMargins.map((row, index) => (
								<TableRow
									key={index}
									className={styles.row}
								>
									<TableCell component="th" scope="row">
										{row.startDate.format('DD/MM/YYYY')}
									</TableCell>
									<TableCell align="right">{row.deadline.format('DD/MM/YYYY')}</TableCell>
									<TableCell align="right">{row.name}</TableCell>
									<TableCell align="right">{row.margin}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			}
		</div>
	)
}
