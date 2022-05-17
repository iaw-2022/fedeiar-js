import React from 'react';

// Saludo usando componentes

/* class Saludo extends React.Component{
    render(){
        let nombre = this.props.nombre;
        return <h1 className='display-1'>
            Hola {nombre}!
        </h1>
    }
} */

// Boton con componentes y eventos

/* class Saludo extends React.Component {

    event() {
        window.alert("click!");
    }

    render() {
        let nombre = this.props.nombre;
        return (
            <div>
                <h1 className='display-1'>Hola {nombre}!</h1>
                <button onClick={this.event}>Clickea {nombre}!</button>
            </div>
        );
    }
}
/* function event(){
    window.alert("click!");
} */ 

// Utilizando estados

/* class Saludo extends React.Component {
    state = {
        nombre: this.props.nombre
    }

    event = () => {
        this.setState({
            nombre: "NOT fede",
        });
    }

    render() {
        return (
            <div>
                <h1 className='display-1'>Hola {this.state.nombre}!</h1>
                <button onClick={this.event}>Cambia tu nombre!</button>
            </div>
        );
    }
} */


// En lugar de una clase, podemos definir un componente funcional:

/* function Saludo(props){
    let nombre = props.nombre;
    return <h1 className='display-1'>
        Hola {nombre}!
    </h1>
} */

// Utilizando listas

/* function Saludo(props){
    const letras = ['a','b','c'];
    const listado = letras.map( (letra, index) => 
        <li value={index}> {index} :     {letra} </li>
    );

    let nombre = props.nombre;
    return(
        <div>
            <h1 className='display-1'>Hola {nombre}!</h1>
            {listado}
        </div>
    );
} */

// Utilizando claves
/* 
function Saludo(props){
    
    const datos = {1: "a", 2: "b", 3: "c", 4: "d"};
    const listado = Object.keys(datos).map( (clave) => 
        <li value={clave}> {datos[clave]} </li>
    );

    let nombre = props.nombre;
    return(
        <div>
            <h1 className='display-1'>Hola {nombre}!</h1>
            {listado}
        </div>
    );
}
 */

// Utilizando la API con estados y clases.


class Saludo extends React.Component {
    state = {
        isLoaded: false,
        items: null,
        error: null,
        nombre: this.props.nombre
    }

    componentDidMount(){
        let route = process.env.REACT_APP_API_URL+'/games/'; // REACT_APP_API_URL=http://127.0.0.1:4000
        fetch(route)
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
                    });
                },
                (error) => {
                    console.log(error);
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    }

    render() {
        const { error, isLoaded, items } = this.state;
        Array.isArray(items);
        if(error){
            return <div>Error: {error.message} </div>;
        } else if(!isLoaded){
            return <div>Loading...</div>;
        } else{
            console.log(items);
            if(items.code){ // ya que este campo solo esta en el json si tiene error, pero como podría capturar el código de error sin el json?
                return (
                    <h1>Error: {items.message}</h1>
                )
            }
            if(!Array.isArray(items)){
                return(
                    <h1>Game: {items.game_name}</h1>
                );
            }
            return(
                 <ul>
                    {
                        items.map( (item) => (
                            <li key={item.id}>
                                {item.game_name}
                            </li>
                        ))
                    }
                </ul>
            );
        }
    }
}

export default Saludo;