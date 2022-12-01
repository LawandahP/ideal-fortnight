import { Link } from "react-router-dom"
import { NgPageContainer } from "../components/display/elements"
import { NgDashboardContainer } from '../screens/dashboard/dashboardElements'

const PageNotFound = () => {
    return (
        <NgPageContainer>
            <article>
                <h1>Oops!</h1>
                <p>Page Not Found</p>
                <>
                    <Link to="/dashboard">Go to Dashboard</Link>
                </>
            </article>
        </NgPageContainer>
        
    )
}

export default PageNotFound