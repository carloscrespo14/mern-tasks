'use strict'
import React, { Component } from 'react';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            _id:"",
            title: "",
            description: "",
            lifetime:"",
            task_status:"",
            tasks:[],
            checked:true
            
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

//Agregar y actualizar tareas
    addTask(e){
        e.preventDefault();
        if(this.state._id){
           fetch(`/api/tasks/${this.state._id}`,{
               method:'PUT',
               body:JSON.stringify(this.state),
               headers: {
                    'Accept': 'application/x-www-form-urlencoded',
                    'Content-Type':'application/json'
                }
           })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html:'Tarea Actualizada'})
                this.getTasks();
            })
        } else {
            
            fetch('/api/tasks/', {
                method: 'POST',
                body:JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/x-www-form-urlencoded',
                    'Content-Type':'application/json'
                }
            })
            .then(res => console.log(res))
            .then(data => {
                M.toast({html:'Tarea Guardada'});
                this.setState({title:'', description:''})
                this.getTasks();
            })
            .catch(err => console.error(err))
        }
    }

//consultar tareas    
    getTasks(e){
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    tasks: data
                })
                console.log(this.state.tasks)
            })
    }


//eliminar tareas
    delTask(id){
        if(confirm('¿Vas a eliminar la tarea?')){
            fetch(`/api/tasks/${id}`, {
                method:'DELETE',
                headers: {
                    'Accept': 'application/x-www-form-urlencoded',
                    'Content-Type':'application/json'
                }   
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html:'Tarea Eliminada'});
                this.getTasks();
            })
            .catch(err => {
                M.toast({html:'Error al intentar eliminar la tarea'});
                this.getTasks();
            })

        } 
    }

//consultar tareas para ser actualizadas, captura el id de la tarea y actualiza el this.state
//con los valores a ser modificados     
    updateTask(id){
        fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                title:data.task.title,
                description:data.task.description,
                _id:data.task._id,
            });
            console.log(this.state)
        })
    }

//cambiar el status de las tareas entre iniciado, pausado y finalizado    
    statusChange(id){
        console.log(id)
        status(toggle)
    }

    status(toggle){
        toggle = !toggle;
        return toggle
    }

//maneja los cambios en los input
    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

//carga las tareas al iniciar el componente    
    componentDidMount(){
        this.getTasks()
    }


    render() {
        return (
            <div>
                <div className="navbar-fixed">
                    <nav className='orange darken-4 '>
                        <div className='container'>
                            <a href="/" className='brand-logo center'>
                                FSMERN
                            </a>
                        </div>
                    </nav>
                </div>
                
                <div className="">
                    <div className="row">
                        
                        <div className="col l6 m12 s12">
                            <div className="card tareas">
                                <div className="card-content">
                                {
                                    this.state.tasks.map((task) =>{
                                        return(
                                            <div className="card" key={task._id}>
                                                 <div className="card-content">
                                                    <div className="row task">
                                                        <div className="taskcontainer">
                                                            {task.title}
                                                        </div>
                                                        <div className="taskcontainer">
                                                            {task.description}
                                                        </div>
                                                        <div className="taskcontainer">
                                                            {task.lifetime}
                                                        </div>

                                                        <div className="taskcontainer">
                                                            <button className="actions waves-effect waves-light btn-small orange darken-4" onClick={()=>{this.statusChange(task._id)}}><i className="material-icons">pause</i></button>
                                                            <button className="actions waves-effect waves-light btn-small orange darken-4" onClick={()=>{this.updateTask(task._id)}}><i className="material-icons">edit</i></button>
                                                            <button className="actions waves-effect waves-light btn-small orange darken-4" onClick={()=>{this.delTask(task._id)}}><i className="material-icons">delete</i></button>
                                                        
                                                            <label>
                                                                <input type="checkbox" className="filled-in" checked={ this.status(this.props.checked) }  onChange={this.handleChange} onClick={()=>{this.statusChange(task._id)}} />
                                                                <span>Terminada</span>
                                                            </label>
    
                                                        </div>
                                                    </div>                 
                                                 </div>
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        </div>

                        <div className="col l6 s12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="row">
                                    <h4 className="center"> Tarea </h4>
                                        <form className="col m12 s12" onSubmit = {this.addTask}>
                                            <div className="input-field col s12">
                                                <input placeholder="Titulo" type="text" id="title" name="title" onChange = {this.handleChange} value={this.state.title || ''}></input> 
                                            </div>
                                            <div className="input-field col s12">
                                                <textarea className="materialize-textarea"placeholder="Descripcion" name="description" onChange = {this.handleChange} value={this.state.description || ''}></textarea>
                                            </div>
                                            <div className="input-field col s12">
                                                <p className="center">
                                                    <label>
                                                        <input className="with-gap"  type="radio" name="lifetime" value="corto" onChange = {this.handleChange} />
                                                        <span>Corta</span>
                                                    </label>

                                                    <label>
                                                        <input className="with-gap"  type="radio" name="lifetime" value="media" onChange = {this.handleChange}  />
                                                        <span>Media</span>
                                                    </label>

                                                    <label>
                                                        <input className="with-gap" type="radio" name="lifetime" value="larga" onChange = {this.handleChange}  />
                                                        <span>Larga</span>
                                                    </label>
                                                </p>
                                            </div>
                                            
                                            <div className="input-field col s12">
                                                <button className="waves-effect waves-light btn-large orange darken-4 col s12" type="submit">
                                                    ENVIAR
                                                </button>    
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="card graficas">
                                <div className="card-content">
                                    .graficas    
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        )
    }
}

export default App;