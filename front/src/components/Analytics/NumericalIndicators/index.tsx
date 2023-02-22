import {Card} from 'antd'
import {NumericalIndicators} from '../../../../api/useAnalytics'
import styles from './styles.module.css'

function prepareRenderValue(value: any): string {
	return !value ? 0 : value
}

export default function NumericalIndicatorsComponent(props: NumericalIndicators) {
	return (
		<Card title="Числовые показатели" bordered={false} style={{width: '100%'}}>
			<div className={styles.cardItemListWrapper}>
				<div className={styles.cartItemWrapper}>
					<span className={styles.cardItem}>Средний чек: {prepareRenderValue(props.averageCheck?.toFixed(1))} ₽</span>
				</div>
				<div className={styles.cartItemWrapper}>
					<span
						className={styles.cardItem}>Среднее количество дней изготовления: {prepareRenderValue(props.averageProductionDays)}</span>
				</div>
				<div className={styles.cartItemWrapper}>
					<span
						className={styles.cardItem}>Количество изделий: {prepareRenderValue(props.numberOfProducts)} шт.</span>
				</div>
			</div>
		</Card>
	)
}
