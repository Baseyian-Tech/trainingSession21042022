import logo from './logo.svg';
import './App.css';
import Todoitem from './components/Todo_item';
import {useState} from 'react';

// jsx - javascript + xml

function App() {

  const [show,setshow]=useState(false);

  const todos=[
    {
      __id:1,
      title:"todo1",
      desc:"this first desc",
      
    },
    {
      __id:2,
      title:"todo2",
      desc:"this 2 desc",
      
    },
    {
      __id:3,
      title:"todo3",
      desc:"this 3 desc",
      
    },
  ];

  const handleDelete=(e)=>{

    console.log("delete btn pressed");

  };
  const handleUpdate=(e)=>{

    setshow(true);
      
      console.log("update btn pressed");
  
  }
  return (
  <div className="container">
    <div className="row">
      <h1>My First todo app </h1>
    <div className="col-md-8">
      {
        todos.map((item)=>   <Todoitem key={item.__id} title={item.title} desc={item.desc} id={item.__id} deletedata={handleDelete} updatedata={handleUpdate} />)
      }
    
      {/* <Todoitem title="todo2" desc="decription 2" id="1" />
      <Todoitem title="todo3" desc="decription 3" id="1" />
      <Todoitem title="todo4" desc="decription 3" id="1" />
      <Todoitem title="todo5" desc="decription 4" id="1" /> */}
    </div>
    <div className="col-4">
      <div className="row">
        
      <div className="col-md-12">
            <form action="">
                    <div className="form-group">
                      <h2>Add new  todo item</h2>
                        <label htmlFor="to_title" style={{fontWeight:"bold"}}>Title</label>
                        <input type="text" className='form-control my-2' name="to_title" id="to_title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="to_desc" style={{fontWeight:"bold"}}>description</label>
                        <textarea  className='form-control my-2' name="to_desc" id="to_title" />
                    </div>
                    <button type='button' className='btn btn-danger my-3'>Add Todo</button>
                </form>
            </div>


{
  show? <div className="col-md-12">
  <form action="">
          <div className="form-group">
            <h2>Update form</h2>
              <label htmlFor="to_title" style={{fontWeight:"bold"}}>Title</label>
              <input type="text" className='form-control my-2' name="to_title" id="to_title" />
          </div>
          <div className="form-group">
              <label htmlFor="to_desc" style={{fontWeight:"bold"}}>description</label>
              <textarea  className='form-control my-2' name="to_desc" id="to_title" />
          </div>
          <button type='button' className='btn btn-danger my-3'>Update Todo</button>
      </form>
  </div>: null
}
           
      </div>
                {/* here form is render here */}
               

            
                


            </div>


    </div>
    
     
  </div>
  );
}

export default App;
