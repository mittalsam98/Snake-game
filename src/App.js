import React from 'react';
import './App.css';

class App extends React.Component {
constructor(){
  super();
  const grid=[];
  for (let row = 0; row <=19; row++) {
    const cols=[]
    for (let col = 0; col <=19; col++) {
      cols.push({
        row,
        col
      });
      }
      grid.push(cols)
  }

  this.state={
    grid,
    apple:{
      row:Math.floor(Math.random()*20),
      col:Math.floor(Math.random()*20)
    },
    snake:{
     head:{
      row:9,
      col:9
    },
    velocity:{
      x:1,
      y:0
    },
    tail:[]
    }
  }
}

componentDidMount=()=>{
setTimeout(()=>{
  this.gameLoop();
},1000)
}

gameLoop=()=>{

  if(this.state.gameOver){
    return;
  }
  
  this.setState(({snake})=>({ 
    snake:{
      ...snake,
      head:{
       row: snake.head.row+snake.velocity.y,
        col:snake.head.col+snake.velocity.x
     },
     tail:snake.tail.map(cell=>({
       row:cell.row+snake.velocity.x,
       col:cell.col+snake.velocity.y
     }))
     },
  }),()=>{

    setTimeout(()=>{

      if(this.isOffEdge()){
        this.setState({
          gameOver:true,
        })
        return;
      }

      if(this.collidesWithApple()){
         this.setState(({tail,head})=>{
           tail.pop();
           return{
             snake:{
               tail:[head,...tail ]
             },
             apple:{
              row:Math.floor(Math.random()*20),
              col:Math.floor(Math.random()*20)
             }
           }
         })
      }

      this.gameLoop()
    },1000)

  })

  console.log(this.state.snake.head)
}


isOffEdge=()=>{
  const {snake}=this.state;
  if(snake.head.col>19||
    snake.head.col<0||
    snake.head.row>19||
    snake.head.row<0){
    return true
  }
}
collidesWithApple=()=>{
  const {apple,snake}=this.state;
  return apple.col===snake.head.row
          && apple.col===snake.head.col ;
}


isApple=(cell)=>{
  const {apple}=this.state;
 return apple.row===cell.row && apple.col===cell.col
}

isHead=(cell)=>{
  const {snake}=this.state;
  return snake.head.row===cell.row && snake.head.col===cell.col
}

  render(){
    const {grid,apple}=this.state;
    // console.log(grid)
  return (
    <div className="App">
      {
      this.state.gameOver?<h1>Game Over! You scored {this.state.snake.tail.length+1}</h1>
      :  <section className='grid'>
      {
        this.state.grid.map((row,rowIndex) =>{
          return(
            row.map(cell=>{
              return(
                <div className={`cell 
                  ${
                    this.isApple(cell)
                    ?'apple': this.isHead(cell)
                    ?'head':''
                  }
                `}></div>

              )
            })
          )
        }
       )
      }
      </section>  
      }
    
    </div>
  )
  };
}

export default App;
