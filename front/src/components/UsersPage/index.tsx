import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import MainNav from '../MainNav'
import styles from './styles.module.css'
import {useRouter} from 'next/router'
import {Search} from '@mui/icons-material'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import TableCell, {tableCellClasses} from '@mui/material/TableCell'
import styled from '@mui/material/styles/styled'
import SettingsSecondaryNav from '../SettingsSecondaryNav'
import React from 'react'
import {Container, IconButton} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import {useState} from 'react'

interface User {
	id: number
	fullName: string
    role: string
	email: string
}

const rows: User[] = [{
	id: 1,
	fullName: 'Васнецов С.В.',
	role: 'Владелец, администратор',
	email: '',
}, {
	id: 2,
	fullName: 'Попов А.И.',
	role: 'Менеджер',
	email: '',
},
]

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
}))

export default function UsersPage() {
	const router = useRouter()

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
						Добавить пользователя
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
								<StyledTableCell align="center">Роль</StyledTableCell>
								<StyledTableCell align="right"></StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map(row => (
								<StyledTableRow
									key={row.id}
									onClick={() => router.push(`/settings/user/${row.id}`)}
								>
									<StyledTableCell component="th" scope="row">
										{row.fullName}
									</StyledTableCell>
									<StyledTableCell align="center">{row.role}</StyledTableCell>
									<StyledTableCell align="center">
										<IconButton
											size="small"
										>
											<DeleteIcon fontSize="small"/>
										</IconButton>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	)
}