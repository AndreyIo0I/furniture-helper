import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import {
	Button,
	Container,
	IconButton,
	InputAdornment,
	Paper,
	Table,
	TableBody,
	TableCell,
	tableCellClasses,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material'
import {styled} from '@mui/material/styles'
import {useRouter} from 'next/router'
import React from 'react'
import MainNav from '../MainNav'
import SettingsSecondaryNav from '../SettingsSecondaryNav'
import styles from './styles.module.css'

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
									<SearchIcon/>
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