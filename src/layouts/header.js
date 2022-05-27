

const Header = (props) => {
    return(
        <div>
            <header className="pt-2 mb-4 text-center">{props.children}</header>
            <hr></hr>
        </div>
    );
}

export default Header