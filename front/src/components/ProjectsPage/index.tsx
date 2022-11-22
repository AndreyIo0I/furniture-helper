import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Link from '../Link'
import * as React from 'react'

export default function ProjectsPage() {
	return (
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
	)
}