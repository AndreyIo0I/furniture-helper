import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import {ProjectPrice, ProjectsPrices} from '../../../../api/useAnalytics'
import styles from './styles.module.css'

export function ProjectsPricesComponent(props: ProjectsPrices) {

	if (!props.projectPrices || props.projectPrices.length === 0) {
		return (
			<><h3>Не найдено данных по текущим фильтрам</h3></>
		)
	}

	return (
		<div className={styles.container}>
			<div>Средняя цена: {props?.averagePrice || 0}</div>
			{props?.minProjectPrice
				&& <div>
					<h4>Проект с минимальной ценой</h4>
					<ProjectPriceComponent
						projectType={props?.minProjectPrice.projectType}
						projectPrice={props?.minProjectPrice.projectPrice}
					/>
				</div>
			}
			{props?.maxProjectPrice
				&& <div>
					<h4>Проект с максимальной ценой</h4>
					<ProjectPriceComponent
						projectType={props?.maxProjectPrice.projectType}
						projectPrice={props?.maxProjectPrice.projectPrice}
					/>
				</div>
			}
			{
				props?.projectPrices && props.projectPrices.length > 0
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
								<TableCell>Название</TableCell>
								<TableCell align="right">Стоимость</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{props.projectPrices && props.projectPrices.map((row, index) => (
								<TableRow
									key={index}
									className={styles.row}
								>
									<TableCell component="th" scope="row">
										{row.projectType}
									</TableCell>
									<TableCell align="right">{row.projectPrice}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			}
		</div>
	)
}

function ProjectPriceComponent(props: ProjectPrice) {
	return (
		<>
			<div>{`Тип проекта: ${props.projectType}`}</div>
			<div>{`Стоимость проекта: ${props.projectPrice}`}</div>
		</>
	)
}
