import {message} from 'antd'

export const saveChangesWithMsg = (fn: () => Promise<any>, msg: string = 'Не удалось сохранить изменения'): void => {
	fn()
		.then(() => message.success('Изменения успешно сохранены'))
		.catch(error => {
			console.error(error)
			message.error(msg).then()
		})
}