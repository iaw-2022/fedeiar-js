

const Header = (props) => {
    return(
        <div>
            <header className="mb-4">{props.children}</header>
            <hr></hr>
        </div>
    );
}

export default Header