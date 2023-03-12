import React, { useEffect, useState } from 'react';
import "./style.css";

const getLocalData = () => {
    const itemList = localStorage.getItem("ToDoList");
    return itemList ? JSON.parse(itemList) : [];
}

const ToDoList = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  //useEffect will only fire when items value is changed
  useEffect(()=>{
    localStorage.setItem("ToDoList", JSON.stringify(items));
  }, [items]);
  const addItem = () => {
    // !inputData ? alert('Please fill data') : (setItems([...items, inputData]), setInputData(""));
    if (!inputData) {
        alert('Please fill data');
    } else if(inputData && toggleButton){
        setItems(items.map((currentElement)=>{
            return currentElement.id === isEditItem ? {...currentElement, name:inputData} : currentElement;
        }));
        setInputData("");
        setIsEditItem(null);
        setToggleButton(false);
    } else {
        const newData = {
            id: new Date().getTime().toString(),
            name: inputData
        }
        setItems([...items, newData]);
        setInputData("");
    }
  }
  const editItem = (index) => {
    const itemForEdit = items.find((currentElement)=>{
        return currentElement.id === index;
    });
    setInputData(itemForEdit.name);
    setIsEditItem(index);
    setToggleButton(true);
  }
  const deleteItem = (index) => {
    const updatedData = items.filter((currentElement)=>{
        return currentElement.id !== index;
    });
    setItems(updatedData);
  }
  return (
    <>
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src="/images/todo2023.svg" alt='todo' />
                    <figcaption>Add your list here ✌</figcaption>
                </figure>
                <div className='addItems'>
                    <input type="text" className='form-control' value={inputData} onChange={(e)=>{setInputData(e.target.value)}}
                        placeholder='✍ Add item' />
                    {!(toggleButton) ? 
                    <i className="fa fa-solid fa-plus" onClick={()=>{addItem()}}></i> :
                    <i className='far fa-solid fa-edit' onClick={()=>{addItem()}}></i>}
                </div>
                {/* show our items */}
                <div className='showItems'>
                    {items.map((currentElement)=>{
                        const {id, name} = currentElement;
                        return (
                                <div key={id} className='eachItem'>
                                    <h3>{name}</h3>
                                    <div className='todo-btn'>
                                        <i className="far fa-solid fa-edit" onClick={()=>{editItem(id)}}></i>
                                        <i className="far fa-solid fa-trash-alt" onClick={()=>{deleteItem(id)}}></i>
                                    </div>
                                </div>                            
                        )
                    })}
                </div>
                {/* remove all button */}
                <div className='showItems'>
                    <button className='btn effect04' data-sm-link-text="Remove All" onClick={()=>{setItems([])}}>
                        <span>CHECK LIST</span>
                    </button>
                </div>
            </div>
        </div>
    </>
  )
};

export default ToDoList;