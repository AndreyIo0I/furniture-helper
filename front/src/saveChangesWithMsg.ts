import {message} from 'antd'

export const saveChangesWithMsg = (fn: () => Promise<void>) => {
	fn()
		.then(() => message.success('Изменения успешно сохранены'))
		.catch(error => {
			console.error(error)
			message.error('Не удалось сохранить изменения')
		})
}