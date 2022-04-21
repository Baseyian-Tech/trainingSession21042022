import React from "react";
import "./style.css";

const Todoitem = ({ title, desc, id, deletedata, updatedata }) => {


    return (
        <div className="todo-item ">
            <div className="card">
                <div className="card-title">
                    <h1>{title}</h1>

                </div>
                <div className="card-body">
                    <p>{desc}</p>

                </div>
                <div className="card-footer ">
                    <div className="action">
                        <button id="update" onClick={updatedata}>Update</button>
                        <button className="del" onClick={deletedata} >Delete</button>
                    </div>

                </div>
            </div>




        </div>

    );
}

export default Todoitem;