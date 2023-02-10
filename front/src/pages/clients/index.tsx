import {Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import styled from '@mui/material/styles/styled'
import {tableCellClasses} from '@mui/material/TableCell'
import {Button} from 'antd'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
import useClients from '../../../api/clients/useClients'
import {UserRole} from '../../../api/users/createUser'
import useCurrentUser from '../../../api/users/useCurrentUser'
import MainLayout from '../../components/MainLayout'
import NewClientPopup from '../../components/NewClientPopup'
import styles from './styles.module.css'

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

	const [isNewClientPopupOpen, setIsNewClientPopupOpen] = useState(false)

	const {data: clients} = useClients()

	const {data: currentUser} = useCurrentUser()

	const isEditable = currentUser && currentUser.role !== UserRole.Manager

	return (
		<MainLayout>
			<Container maxWidth="lg">
				<div className={styles.top}>
					<div></div>
					{isEditable && (
						<Button
							onClick={() => setIsNewClientPopupOpen(true)}
							type="primary"
						>
							Добавить клиента
						</Button>
					)}
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
									onClick={() => router.push(`/clients/${row.id}`)}
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
			<NewClientPopup
				open={isNewClientPopupOpen}
				onCancel={() => setIsNewClientPopupOpen(false)}
			/>
		</MainLayout>
	)
}