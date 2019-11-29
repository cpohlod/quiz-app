import React from 'react';
import Button from './Button';
import './App.css';

class App extends React.Component {
  state = {
    show:false,
    acertos:0,
    perguntas: [
      {
        id:1,
        descricao: "pergunta 1",
        respostaCorreta: 1,
        resposta:-1,
        alternativas: [{id:1, descricao: "resposta 1"}, {id:2, descricao: "resposta 2"}, {id:3, descricao: "resposta 3"}]
      },
      {
        id:2,
        descricao: "pergunta 2",
        respostaCorreta: 1,
        resposta:-1,
        alternativas: [{id:1, descricao: "resposta 1"}, {id:2, descricao: "resposta 2"}, {id:3, descricao: "resposta 3"}]
      },
      {
        id:3,
        descricao: "pergunta 3",
        respostaCorreta: 2,
        resposta:-1,
        alternativas: [{id:1, descricao: "resposta 1"}, {id:2, descricao: "resposta 2"}, {id:3, descricao: "resposta 3"}]
      },
      {
        id:4,
        descricao: "pergunta 4",
        respostaCorreta: 3,
        resposta:-1,
        alternativas: [{id:1, descricao: "resposta 1"}, {id:2, descricao: "resposta 2"}, {id:3, descricao: "resposta 3"}]
      },
    ]
  }

  selecionaResposta = (event) => {
    console.log(event.target.id);    
    let value = event.target.id;
    let keys = value.split("-");
    let perguntakey = parseInt(keys[0]);
    let alternativaKey = parseInt(keys[1]);
    console.log(perguntakey+"+"+alternativaKey);
    const {perguntas} = this.state;
    perguntas.forEach(pergunta => {
      if (perguntakey === pergunta.id) {
        pergunta.resposta = alternativaKey;
      }      
    });
    let acertos = 0;
    let respondidas = 0;
    perguntas.forEach(pergunta => {
      if (pergunta.resposta !== -1) {
        respondidas++;
      }
      if (pergunta.resposta === pergunta.respostaCorreta) {
        acertos++;
      }
    });
    let show = respondidas===perguntas.length;
    console.log(acertos);
    this.setState({show,
                  acertos,
                  perguntas});
  }

  refaz = () => {
    const {perguntas} = this.state;
    perguntas.forEach(pergunta => {
      console.log(pergunta);
      pergunta.resposta = -1;
    });
    this.setState({show:false,
                  acertos:0,
                  perguntas});
  }

  render() {
    const {show, acertos, perguntas} = this.state;
    return (
      <div className="App" >
        {
          perguntas.map(pergunta => (
          <div data-test="pergunta" 
               data-resposta={
                pergunta.resposta===-1 ? "" : (pergunta.respostaCorreta===pergunta.resposta ? "correta" : "errada")
                             }
               key={pergunta.id}>{pergunta.descricao+' correta:'+pergunta.respostaCorreta}
            <div key={pergunta.id} id={pergunta.id} >
            {
            pergunta.alternativas.map(alternativa => (
              <div data-test="opcao" key={alternativa.id} onClick={this.selecionaResposta} id={pergunta.id+"-"+alternativa.id}>{alternativa.descricao}
              </div>
            ))  
            }
            </div>
          </div>
          ))
        }   
        <Button onClick={this.refaz}/>
        {
          show ===true ? (
            <div data-resultado={acertos}>
                Você acertou {acertos} de {perguntas.length}
             </div>
          )
           : <span></span>
        }  
      </div>
    );
  } 
}
export default App;