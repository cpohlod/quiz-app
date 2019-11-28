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
    console.log(event.target.value);    
    let value = event.target.value;
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
    perguntas.forEach(pergunta => {
      if (pergunta.resposta === pergunta.respostaCorreta) {
        acertos++;
      }
    });
    console.log(acertos);
    this.setState({show:true,
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

  calc = () => {
  
  }  

  render() {
    const {show, acertos, perguntas} = this.state;
    return (
      <div className="App" >
        {
          perguntas.map(pergunta => (
          <div data-test="pergunta" data-resposta={pergunta.respostaCorreta===pergunta.resposta ? "correta" : "errada"}
               key={pergunta.id}>{pergunta.descricao+' correta:'+pergunta.respostaCorreta}
            <select key={pergunta.id} id={pergunta.id} onChange={this.selecionaResposta} >
            {
            pergunta.alternativas.map(alternativa => (
              <option data-test="opcao" key={alternativa.id} value={pergunta.id+"-"+alternativa.id}>{alternativa.descricao}
              </option>
            ))  
            }
            </select>
          </div>
          ))
        }   
        <Button data-test="refazer" onClick={this.refaz}/>
        <Button data-test="refazer" onClick={this.calc}>Refazer o Quiz</Button>
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