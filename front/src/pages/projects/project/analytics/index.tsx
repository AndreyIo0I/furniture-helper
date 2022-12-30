import { Container } from "@mui/material"
import { useEffect, useState } from "react"
import { useProjectMarginById, useProjectProfitNormById, useProjectRateOfSurplusValueById } from "../../../../../api/useAnalytics"
import MainNav from "../../../../components/MainNav"
import ProjectSecondaryNav from "../../../../components/ProjectSecondaryNav"

interface ProjectAnalyticsPageProps {
	projectId: number
}

interface ProjectAnalyticsState {
    projectMargin: string,
    profitNorm: string,
    rateOfSurplusValue: string
}

interface ContentProps {
    analytics: ProjectAnalyticsState
    projectId: number
}

function Content(props: ContentProps) {
	return (
		<>
			<MainNav/>
			<ProjectSecondaryNav projectId={props.projectId}/>
			{props && props.analytics && 
                <Container maxWidth="lg">
                    <div>{`Маржа по проекту: ${props.analytics.projectMargin}`}</div>
                    <div>{`Норма прибыли по проекту: ${props.analytics.profitNorm}`}</div>
                    <div>{`Норма прибавочной стоимости по проекту: ${props.analytics.rateOfSurplusValue}`}</div>
			    </Container>}
		</>
	)
}

export default function ProjectAnalyticsPage(props: ProjectAnalyticsPageProps) {
    const [projectAnalytics, setProjectAnalytics] = useState<ProjectAnalyticsState>({
        projectMargin: "",
        profitNorm: "",
        rateOfSurplusValue: ""
    })
    

    useEffect(() => {
        Promise.all([useProjectMarginById(props.projectId), useProjectProfitNormById(props.projectId), useProjectRateOfSurplusValueById(props.projectId)])
            .then( ([projectMargin, profitNorm, rateOfSurplusValue]) => {
                setProjectAnalytics({projectMargin: projectMargin.toString(), profitNorm, rateOfSurplusValue})
            })
    }, [])

	return (
        <Content projectId={props.projectId} analytics={projectAnalytics}/>
    )
}
