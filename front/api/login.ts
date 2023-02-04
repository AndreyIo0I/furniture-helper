export default async function login(login: string, password: string) {
	return await fetch(
		'/api/authentification',
		{
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({login, password}),
		},
	)
}