import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <main className="Missing">
            <h2>Page not found</h2>
            <p>Page requested is not valid</p>
            <p>
                <Link to='/'>Visit homepage</Link>
            </p>
        </main>
    )
  }
  
  export default Missing