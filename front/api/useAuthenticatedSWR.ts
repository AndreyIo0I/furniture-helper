import {SWRResponse} from 'swr'

export async function makeAuthenticatedReq<RES>(req: () => Promise<RES>): Promise<RES> {
	try {
		return await req()
	}
	catch (res) {
		if (res instanceof Response && res.status === 401) {
			location.href = '/login'
		}

		if (res instanceof Response && res.status === 403) {
			location.href = '/projects'
		}
		throw res
	}
}

export default function useAuthenticatedSWR<DATA, ERROR>(res: SWRResponse<DATA, ERROR>): SWRResponse<DATA, ERROR> {
	if (res.error instanceof Response && res.error.status === 401) {
		location.href = '/login'
	}

	if (res.error instanceof Response && res.error.status === 403) {
		location.href = '/projects'
	}

	return res
}
