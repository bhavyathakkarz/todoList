import React, { useEffect, useState } from 'react';
import home from '../src/images/img1.png';
import swal from 'sweetalert';

const getLocalItem=()=>{
    var list=localStorage.getItem('lists');
    if(list){
        return JSON.parse(list);
    }
    else{
        return [];
    }
}

const App=()=>{
    const [data,setData]=useState('');
    const [item,setItem]=useState(getLocalItem());
    const [toggle,setToggle]=useState(false);
    const [itemId,setItemId]=useState(null);

    const addItem=()=>{
        if(!data){
            swal("Data is Empty");
        }
        else if(data && toggle){
            setItem(item.map((ele)=>{
                if(ele.id===itemId){
                    return{...ele,name:data}
                }
                return ele;
            }))

            setToggle(false);
            setData('');
            setItemId(null);

        }
        else{
            const allItem={id:new Date().getTime().toString(),name:data}
            setItem([...item,allItem]);
            setData('');
        }
    }

    useEffect(()=>{
        localStorage.setItem('lists',JSON.stringify(item));
    },[item]);

    const inputEvent=(e)=>{
        setData(e.target.value);
    }
    const deleteItem=(ind)=>{
        setItem((preValue)=>{
            return preValue.filter((ele)=>{
                return ind!==ele.id;
            })
        })
    }

    const editItem=(index)=>{
        const edit=item.find((ele)=>{
            return ele.id===index;
        });

        setToggle(true);
        setData(edit.name);
        setItemId(edit.id);
    }

    const removeAll=()=>{
        setItem([]);
    }
    return(
        <>
            <div className="main-div">
                <div className="center-div">
                    <div className="logo">
                    <figure>
                        <img src={home} alt="img" width="100px" height="100px" />
                    </figure>
                    <figcaption>Add Your List Here</figcaption>
                    </div>
                    <div className="input-div">
                        <input type="text" name="data" value={data} onChange={inputEvent}/>
                        {
                            toggle?<i className="fa fa-edit" title="Update" onClick={addItem}></i>:
                            <i className="fa fa-plus" title="Add" onClick={addItem}></i>
                        }
                        
                    </div>
                    <div className="item-list">
                            {item.map((ele)=>{
                                return(
                                <div className="each" key={ele.id}>
                                    <h1>{ele.name}</h1>
                                    <div className="icon-div">
                                        <i className="fa fa-edit fa-2x edit" title="Edit" onClick={()=>editItem(ele.id)}></i>
                                        <i className="fa fa-trash fa-2x bin" title="Delete" onClick={()=>deleteItem(ele.id)}></i>
                                    </div>
                                </div>
                            )
                            })}
                    </div>
                    <div className="btn">
                        <button className="remove" onClick={removeAll}>
                            Remove All
                        </button>
                    </div>
                    <br/>
                </div>
            </div>
        </>

    )
}

export default App;
