import logo from './logo.svg';
import './App.css';
import Todoitem from './components/Todo_item';
import {useState,useRef, useEffect} from 'react';

// jsx - javascript + xml

function App() {
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
  const titleref=useRef();
  const descref=useRef();
  const [show,setshow]=useState(false);
  const [items,setItems]=useState(todos);
  const [currentid,setCurrentid]=useState("");
  const [adddata,setAdddata]=useState({

    title:"",
    desc:"",
  });
  const [updata,setupdata]=useState({

    title:"",
    desc:"",
  });

  const handleAddData=(e)=>{ 
  let val=e.target.value;
  setAdddata({
    ...adddata,
    [e.target.name]:val
  });


};


  const handleDelete=(id)=>{

    let org=items.filter((item)=>{

      return(item.__id!==id);

    });

    setItems(org);

  };

  const handleUpdate=(id)=>{

    setshow(true);
    setCurrentid(id);

    
  }

  useEffect(()=>{

    if(currentid!==""){
      let item=items.filter(i=> i.__id===currentid);
      let {__id,title,desc}=item[0];
      titleref.current.value=title;
      descref.current.value=desc;
      setupdata({title,desc});

    }



  },[currentid]);

  

  
  const handleAdditems=(e)=>{
    e.preventDefault();
    let index=items.length+1;
    let newItem={...adddata,__id:index};
   setItems([...items,newItem]);




  }

  const handleUpdatedata=(e)=>{
    let val=e.target.value;
    setupdata({ ...updata,[e.target.name]:val});
  


  }

  const handleChangeList=()=>{

    let org=[...items];
    org.forEach((item)=>{

      if(item.__id===currentid){
        item.title=updata.title;
        item.desc=updata.desc;
      }

      }

    );


  setItems(org);

   

  }
  return (
  <div className="container">
    <div className="row">
    <div className="col-md-8">
      <h3 className='m-4 text-secondary'>Todo app </h3>
      {
        items.map((item)=>   <Todoitem key={item.__id} title={item.title} desc={item.desc} id={item.__id} deletedata={handleDelete} updatedata={handleUpdate} />)
      }
    
    </div>
    <div className="col-4">
      <div className="row">
        
      <div className="col-md-12">
                      <h2>Add new  todo item</h2>
            <form action="">
                    <div className="form-group">
                        <label htmlFor="to_title" style={{fontWeight:"bold"}}>Title</label>
                        <input onChange={handleAddData} value={adddata.title} type="text" className='form-control my-2' name="title" id="title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="to_desc" style={{fontWeight:"bold"}}>description</label>
                        <textarea onChange={handleAddData} value={adddata.desc} className='form-control my-2' name="desc" id="to_title" />
                    </div>
                    <button type='submit' onClick={handleAdditems} className='btn btn-danger my-3'>Add Todo</button>
                </form>
            </div>


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
              <textarea onChange={handleUpdatedata}  ref={descref} className='form-control my-2' name="desc"  id="to_title" />
          </div>
          <button type='button' onClick={handleChangeList} className='btn btn-danger my-3'>Update Todo</button>
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
