

const Header = (props) => {
    return(
        <div>
            <h1 className="display-2 mb-4">{props.children}</h1>

        </div>
    );
}

export default Header