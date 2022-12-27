import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import useClients from '../../../../api/useClients'
import MainNav from '../../../components/MainNav'
import styles from './styles.module.css'
import {useRouter} from 'next/router'
import {Search} from '@mui/icons-material'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import TableCell, {tableCellClasses} from '@mui/material/TableCell'
import styled from '@mui/material/styles/styled'
import SettingsSecondaryNav from '../../../components/SettingsSecondaryNav'
import React from 'react'
import {Container} from '@mui/material'

const StyledTableCell = styled(TableCell)(({theme}) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.info.dark,
		color: theme.palette.common.white,
		fontWeight: '600',
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}))

const StyledTableRow = styled(TableRow)(({theme}) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	'&:last-child td, &:last-child th': {
		border: 0,
	},
	'&:hover': {
		cursor: 'pointer',
	},
}))

export default function ClientsPage() {
	const router = useRouter()

	const {data: clients} = useClients()

	return (
		<>
			<MainNav/>
			<SettingsSecondaryNav/>
			<Container maxWidth="lg">
				<div className={styles.top}>
					<TextField
						margin="none"
						size="small"
						autoFocus
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Search/>
								</InputAdornment>
							),
						}}
					/>
					<Button
						onClick={() => router.push(`${location.pathname}/new`)}
						variant="contained"
					>
						Добавить клиента
					</Button>
				</div>
				<TableContainer
					component={Paper}
					sx={{
						maxWidth: '1440px',
						margin: 'auto',
					}}
				>
					<Table>
						<TableHead>
							<TableRow>
								<StyledTableCell>ФИО</StyledTableCell>
								<StyledTableCell align="center">Телефон</StyledTableCell>
								<StyledTableCell align="right">Канал привлечения</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{clients && clients.map(row => (
								<StyledTableRow
									key={row.id}
									onClick={() => router.push(`/settings/clients/${row.id}`)}
								>
									<StyledTableCell component="th" scope="row">
										{row.fullName}
									</StyledTableCell>
									<StyledTableCell align="center">{row.phone}</StyledTableCell>
									<StyledTableCell align="right">{row.source}</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	)
}