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
    apple:this.getRandomApple(),
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

getRandomApple=()=>({
  row:Math.floor(Math.random()*20),
  col:Math.floor(Math.random()*20)
})

gameLoop=()=>{

  if(this.state.gameOver){
    return;
  }
  
  this.setState(({snake,apple})=>{
    const collidesWithApple=this.collidesWithApple();
    const nextState={ 
      snake:{
        ...snake,
        head:{
         row: snake.head.row+snake.velocity.y,
          col:snake.head.col+snake.velocity.x
       },
       tail:[snake.head, ...snake.tail]
       },
       apple:collidesWithApple?this.getRandomApple():apple
    }

    if(!collidesWithApple) nextState.snake.tail.pop();

    return  nextState;
  },()=>{


      if(this.isOffEdge()){
        this.setState({
          gameOver:true,
        })
        return;
      }

      // if(this.collidesWithApple()){ 
      //    this.setState(({snake})=>{
      //      snake.tail.pop();
      //      return{
      //        snake:{
      //          ...snake,
      //          tail:[snake.head,...snake.tail ]
      //        },
      //        apple:{
      //         row:Math.floor(Math.random()*20),
      //         col:Math.floor(Math.random()*20)
      //        }
      //      }
      //    })
      // }

      setTimeout(()=>{
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

isTail=(cell)=>{
 const {snake}=this.state;
 return snake.tail.find(inTails=>inTails.row===cell.row && inTails.col===cell.col)

}

setVelocity=(event)=>{
  if(event.keyCode===38){
    this.setState((prevState)=>({
      snake:{
        velocity:{
          x:0,
           y:-1
        }
      }
    }))
  }else if(event.keyCode===40){
    this.setState((prevState)=>({
      snake:{
        velocity:{
          x:0,
          y:1
        }
      }
    }))
  }else if(event.keyCode===39){
    this.setState((prevState)=>({
      snake:{
        velocity:{
          x:1,
           y:0
        }
      }
    }))
  }else if(event.keyCode===37){
    this.setState((prevState)=>({
      snake:{
        velocity:{
          x:-1,
           y:0
        }
      }
    }))
  }
}

  render(){
    const {grid,snake,gameOver}=this.state;
    // console.log(grid)
  return (
    <div onKeyPress={this.setVelocity} className="App">
      {
      gameOver?<h1>Game Over! You scored {snake.tail.length+1}</h1>
      :  <section className='grid'>
      {
        grid.map((row,rowIndex) =>{
          return(
            row.map(cell=>{
              return(
                <div className={`cell 
                  ${
                    this.isHead(cell)
                    ?'apple': this.isApple(cell)
                    ?'head': this.isTail(cell)
                    ?'tail':''
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
