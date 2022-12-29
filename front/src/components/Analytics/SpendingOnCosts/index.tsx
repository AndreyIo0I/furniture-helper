import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { SpendingOnCosts } from '../../../../api/useAnalytics'
import styles from './styles.module.css'

export default function SpendingOnCostsComponent(props: SpendingOnCosts) {
	if (!props.spendingOnCosts || props.spendingOnCosts.length === 0)
	{
		return (
			<><h3>Не найдено данных по текущим фильтрам</h3></>
		)
	}

	return (
		<div className={styles.container}>
			{
				props?.spendingOnCosts && props.spendingOnCosts.length > 0
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
										<TableCell>Название издержки</TableCell>
										<TableCell align="right">Сумма</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{props.spendingOnCosts && props.spendingOnCosts.map((row, index) => (
										<TableRow
											key={index}
											className={styles.row}
										>
											<TableCell component="th" scope="row">
												{row.name}
											</TableCell>
											<TableCell align="right">{row.amount}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
			}
		</div>
	)
}
