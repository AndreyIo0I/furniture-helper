import DeleteIcon from '@mui/icons-material/Delete'
import {
	Button,
	Container,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import {styled} from '@mui/material/styles'
import {tableCellClasses} from '@mui/material/TableCell'
import {useRouter} from 'next/router'
import React from 'react'
import {UserRole} from '../../../../api/users/createUser'
import useUsers from '../../../../api/users/useUsers'
import MainNav from '../../../components/MainNav'
import SettingsSecondaryNav from '../../../components/SettingsSecondaryNav'
import styles from './styles.module.css'

function mapUserRoleToString(role: UserRole): string {
	switch (role) {
		case UserRole.Owner:
			return 'Владелец'
		case UserRole.Admin:
			return 'Администратор'
		case UserRole.Manager:
			return 'Менеджер'
	}
	return 'Леди Баг'
}

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

export default function UsersPage() {
	const router = useRouter()

	const {data: users} = useUsers()

	return (
		<>
			<MainNav/>
			<SettingsSecondaryNav/>
			<Container maxWidth="lg">
				<div className={styles.top}>
					<div></div>
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
							{users && users.map(user => (
								<StyledTableRow
									key={user.id}
									onClick={() => router.push(`/settings/users/${user.id}`)}
								>
									<StyledTableCell component="th" scope="row">
										{user.name}
									</StyledTableCell>
									<StyledTableCell align="center">{mapUserRoleToString(user.role)}</StyledTableCell>
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