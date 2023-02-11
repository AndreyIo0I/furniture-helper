import { Card } from "antd";
import { NumericalIndicators } from "../../../../api/useAnalytics";

function prepareRenderValue(value: any): string {
  return !value ? 0 : value
}

export default function NumericalIndicatorsComponent(props: NumericalIndicators) {
	return (
    <Card title="Числовые показатели" bordered={false} style={{ width: '100%' }}>
      <p>Средний чек: {prepareRenderValue(props.averageCheck)}</p>
      <p>Среднее количество дней изготовления: {prepareRenderValue(props.averageProductionDays)}</p>
      <p>Количество изделий: {prepareRenderValue(props.numberOfProducts)}</p>
    </Card>
	)
}
