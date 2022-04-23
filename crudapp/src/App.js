import logo from './logo.svg';
import './App.css';
import Todoitem from './components/Todo_item';
import {useState,useRef, useEffect} from 'react';
import API from './api';

// jsx - javascript + xml

function App() {
  
  // console.log(data)
  const todos=[]
  const titleref=useRef();
  const descref=useRef();
  const [show,setshow]=useState(false);
  const [items,setItems]=useState(todos);
  const [currentid,setCurrentid]=useState("");
  const [adddata,setAdddata]=useState({

    title:"",
    description:"",
  });
  const [updata,setupdata]=useState({

    title:"",
    description:"",
  });

  const handleAddData=(e)=>{ 
  let val=e.target.value;
  setAdddata({
    ...adddata,
    [e.target.name]:val
  });


};


  const handleDelete=(id)=>{

    API.delete(`/todos/${id}/`).then(res=>{
      console.log(res.data)
      if (!res.data.error){
        let org=items.filter((item)=>{
    
          return (item._id.$oid!==id);
    
        });
        setItems(org);
      }
  
    })

  };

  const handleUpdate=(id)=>{
    
    setshow(true);
    setCurrentid(id);

    
  }

  useEffect(()=>{

    if(currentid!==""){
      let item=items.filter(i=> i._id.$oid===currentid);
      let {__id,title,description}=item[0];
      titleref.current.value=title;
      descref.current.value=description;
      setupdata({ title, description
});

    }



  },[currentid]);

  
  useEffect(()=>{
    // endpoint /api/todos/
    API.get('/todos').then(res => {
      setItems(res.data)
      console.log(res.data,"data is here");
    })
  },[])
  
  const handleAdditems=(e)=>{
    e.preventDefault();
    API.post('/todo/create/', adddata).then(res=>{
      console.log(res.data.data)
      setItems([...items, res.data.data])
    })
    // setItems([...items,newItem]);



  }

  const handleUpdatedata=(e)=>{
    
    let val=e.target.value;
    setupdata({ ...updata,[e.target.name]:val});
  


  }

  const handleChangeList=()=>{
    API.put(`/todos/${currentid}/`, updata).then(res => {
      
      let org=[...items];
      org.forEach((item)=>{
  
        if(item._id.$oid===currentid){
          item.title=updata.title;
          item.description=updata.description;
        }
  
        }
  
      );
      setItems(org);
    })


   

  }
  return (
  <div className="container">
    <div className="row">
    <div className="col-md-8">
      <h3 className='m-4 text-secondary'>Todo app </h3>
      {
            items.map((item, i) => <Todoitem key={i} title={item.title} desc={item.description} id={item._id.$oid} deletedata={handleDelete} updatedata={handleUpdate} />)
      }
    
    </div>
    <div className="col-4">
      <div className="row">
        
     

{
  show? <div className="col-md-12">
  <form action="">
          <div className="form-group">
            <h2>Update form</h2>
              <label htmlFor="to_title" style={{fontWeight:"bold"}}>Title</label>
              <input type="text" ref={titleref} onChange={handleUpdatedata}  className='form-control my-2' name="title" ids={""} id="title" />
          </div>
          <div className="form-group">
              <label htmlFor="to_desc" style={{fontWeight:"bold"}}>description</label>
              <textarea onChange={handleUpdatedata}  ref={descref} className='form-control my-2' name="description"  id="to_title" />
          </div>
          <button type='button' onClick={handleChangeList} className='btn btn-danger my-3'>Update Todo</button>
          <button type='button' onClick={()=>{
            setshow(false)
          }} className='btn btn-danger my-3 ml-3'>Add Todo</button>
      </form>
              </div> : <div className="col-md-12">
                <h2>Add new  todo item</h2>
                <form action="">
                  <div className="form-group">
                    <label htmlFor="to_title" style={{ fontWeight: "bold" }}>Title</label>
                    <input onChange={handleAddData} value={adddata.title} type="text" className='form-control my-2' name="title" id="title" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="to_desc" style={{ fontWeight: "bold" }}>description</label>
                    <textarea onChange={handleAddData} value={adddata.description} className='form-control my-2' name="description" id="to_title" />
                  </div>
                  <button type='submit' onClick={handleAdditems} className='btn btn-danger my-3'>Add Todo</button>
                </form>
              </div>

}
           
      </div>
                {/* here form is render here */}
               

            
                


            </div>


    </div>
    
     
  </div>
  );
}

export default App;
