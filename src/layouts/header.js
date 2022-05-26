

const Header = (props) => {
    return(
        <div>
            <header className="pt-2 mb-4">{props.children}</header>
            <hr></hr>
        </div>
    );
}

export default Header