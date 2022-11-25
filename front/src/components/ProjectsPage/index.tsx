import {Box, Container} from '@mui/material'
import Link from '../Link'
import * as React from 'react'
import MainNav from '../MainNav'

export default function ProjectsPage() {
	return (
		<>
			<MainNav/>
			<Container maxWidth="md">
				<Box
					sx={{
						my: 4,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					Home page
					<Link href="/login" color="secondary">
						Go to the login page
					</Link>
				</Box>
			</Container>
		</>
	)
}