import Body from "./layouts/body";
import Header from "./layouts/header";

const Home = () => {
    return(
        <div>
            <Header><h1 className="display-3">Home</h1></Header>

            <Body>
                <p className="lead fs-3">Welcome! Use the navigation bar to browse the site.</p>
            </Body>
        </div>
    )
}

export default Home;