
import Buscador from './componentes/Buscador'
import Resultado from './componentes/Resultado';
import React, {Component} from 'react';


class App extends Component {

 
   state = {
    termino : '',
    imagenes : [],
    pagina:''
  } 

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'end')
  }

  paginaAnterior = () => {
      //leer el state de la pagina actual
      let pagina = this.state.pagina;

      //leer si la pagina es 1, ya no ir hacia atras
      if(pagina == 1) return null;

      //restar uno a la pagina actual
      pagina -= 1;
  
      //agregar el cambio al state
      this.setState({
        pagina
      }, () => {
      this.consultarApi();
      this.scroll();
  });
    
  }
  paginaSiguiente = () => {
    //leer el state de la pagina actual
    let pagina = this.state.pagina;

    //sumar uno a la pagina actual
    pagina += 1;

    //agregar el cambio al state
    this.setState({
      pagina
    }, () => {
    this.consultarApi();
    this.scroll();
  });
   
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=28936505-873e1c42fa7f0a37c63a3226f&q=${termino}&per_page=8&page=${pagina}`;
  
    //console.log(url);

    fetch(url)
    .then(respuesta => respuesta.json() )
    .then(resultado => this.setState({imagenes : resultado.hits}) )
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina : 1
    }, () => {
      this.consultarApi();
    })
  }


  render () {
    return (
    <div className="app container">
     <div className="jumbotron">
      <p className="lead text-center">Buscador de imágenes</p>
      <Buscador 
      datosBusqueda={this.datosBusqueda} />
     </div>
     <div className='row justify-content-center'>
     <Resultado imagenes={this.state.imagenes}
                paginaAnterior={this.paginaAnterior}
                paginaSiguiente={this.paginaSiguiente} />
     </div>
    </div>
    );
  };
}

export default App;
