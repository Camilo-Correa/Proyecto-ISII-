import Testimonio  from './components/Testimonio';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='contenedor-principal'>
          <h1>Testimonios de Nuestro Alumnos</h1>
          <Testimonio 
          const jsontext = {'./data/testimonio.json'}
           nombre='Emma Bostian'
           pais='suecia'
           imagen='3'
           cargo='Ingeniero de Software'
           empresa='Spotify'
           testimonio='Lorem ipsum dolor sit amet consectetur 
                      adipisicing elit. Ut qui temporibus laudantium, 
                      delectus inventore nihil. Consectetur voluptates 
                      sapiente, odio modi culpa, inventore nihil maxime alias, 
                      dolores reprehenderit consequuntur necessitatibus quibusdam!' 
           titulo='foto1' /> 
                    
         <Testimonio 
           nombre='Shan Wang'
           pais='Singapur'
           imagen='2'
           cargo='Ingeniero de Software'
           empresa='Amazon'
           testimonio='Lorem ipsum dolor sit amet consectetur 
                      adipisicing elit. Ut qui temporibus laudantium, 
                      delectus inventore nihil. Consectetur voluptates 
                      sapiente, odio modi culpa, inventore nihil maxime alias, 
                      dolores reprehenderit consequuntur necessitatibus quibusdam!' 
           titulo='foto2' /> 
          <Testimonio 
           nombre='Sarah'
           pais='Sudafrica'
           imagen='1'
           cargo='Ingeniero de Software'
           empresa='Realtech'
           testimonio='Lorem ipsum dolor sit amet consectetur 
                      adipisicing elit. Ut qui temporibus laudantium, 
                      delectus inventore nihil. Consectetur voluptates 
                      sapiente, odio modi culpa, inventore nihil maxime alias, 
                      dolores reprehenderit consequuntur necessitatibus quibusdam!' 
           titulo='foto3' />          
      </div>      
    </div>
  );
}

export default App;
