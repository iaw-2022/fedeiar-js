import Body from "./layouts/body";
import Header from "./layouts/header";

const About = () => {
    return(
        <div>
            <Header><h1 className="display-3">About</h1></Header>

            <Body>
                <p className="lead"><strong>Speedrunning is the act of playing a video game with the intent of completing it as fast as possible, for the purposes of entertainment and / or competition. You can read more about speedrunning on <a href="https://en.wikipedia.org/wiki/Speedrun">Wikipedia.</a></strong></p>
                <p className="lead"><strong>We welcome all speedrunners to join us in helping grow this site, and speedrunning itself.</strong></p>
            </Body>
        </div>
    )
}

export default About;