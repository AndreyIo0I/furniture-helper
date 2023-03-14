import {message} from 'antd'

export const saveChangesWithMsg = (fn: () => Promise<any>, msg?: string): void => {
	fn()
		.then(() => message.success('Изменения успешно сохранены'))
		.catch(error => {
			console.error(error)
			message.error(msg ?? 'Не удалось сохранить изменения').then()
		})
}