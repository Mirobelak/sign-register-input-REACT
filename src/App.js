import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
// import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
// import Clarifai from 'clarifai'
import SignComp from './Components/SignComp/SignComp'
import Register from './Components/Register/Register'

// const app = new Clarifai.App({
//   apiKey: 'bbd83ec4e2ec4c9dbef72cd10d3da7ff'
//  });


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      newWho:"",
      imageUrl: "",
      route: 'signin',
      isSignedIn: false,
      box: {},
      characters: []
    }
  }

 
  onInputChange = (event) => {
    this.setState({newWho: event.target.value});
  }

  
  onRouteChange = (route) => {
    
    if (route==='signout') {
      this.setState({isSignedIn:false})
    } else if (route === "home") {
      this.setState({isSignedIn: true})
    } 
    
    this.setState({route: route})
  }


  
  listOfDudes = () => {
    return this.state.characters.map(dude => (
      
       <li className='dude' >
         <p className='ctrl'  onClick={() => this.removeDude(dude)}>
             x
          </p>
          <article >
             {dude.who}
          </article>
         
       </li>

    ))
 }

 removeDude = dude => {
  this.setState(state => {
     return {
        characters: state.characters.filter(item => item !== dude)
     }
  })
}

onButtonSubmit = (e) => {
        e.preventDefault();
        this.setState(state => {
        const newDude = {
           id: Math.max(...state.characters.map(d => d.id)) + 1,
           who: this.state.newWho
        }

        return {
           characters: [...state.characters, newDude]
        }
     })

    //  this.resetForm()
  }

//   resetForm = () => {
//     this.setState({
//        input: '',
//     })

//     this.input.current.focus()
//  }

  render() {
    return (
      <div className="App">
        
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === 'home' ? 
        <div>
        <Logo/>
        <Rank/>
        <h1 className='white f2' >{this.state.input}</h1>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <ul>{this.listOfDudes()}</ul>
        {/* <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} /> */}
        </div> 
        : ( this.state.route === 'signin' ? <SignComp onRouteChange={this.onRouteChange}/> :
        <Register onRouteChange={this.onRouteChange}/>)
    }
    </div>
    );
  }
}

export default App;

