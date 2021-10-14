import './App.css';
import React, {useState} from 'react';
import List from './List';
import Alert from './Alert';

function App() {
  const getLocalStorage = ()=>{
    if(localStorage.hasOwnProperty('list')){
      return(JSON.parse(localStorage.getItem('list')))
    }
    else{
      return [];
    }
  }
  const setLocalStorage = (setarray)=>{
    localStorage.setItem('list', JSON.stringify(setarray));
  }
  const [name, setName] = useState('');
  const [isEditing, setIsEditing]= useState(false);
  const [editid, setEditId] = useState(null);
  const [list, setList] = useState(getLocalStorage());
  const [isAlert, setIsAlert] = useState({show:false, msg:'', type: ''});
  const addListItem = (e)=>{
    e.preventDefault();
    if(!name){
      showAlert(true, 'Enter Name Please', 'alert-red');
    }
    else if(name && isEditing){
      const newarr = list.map((item)=>{
        if(item.id === editid){return {...item, 'title':name}}
        return item;
      });
      setList(newarr);
      setName('');
      setEditId(null);
      setIsEditing(false);
      setLocalStorage(newarr);
      showAlert(true, 'Item Editied', 'alert-green');
    }
    else{
      const newitem = {'id': new Date().getTime().toString(), 'title': name}
      const newarr = [...list, newitem];
      setLocalStorage(newarr);
      setList(newarr);
      setName('');
      showAlert(true, 'Item Created', 'alert-green');
    }  
  }
  const deleteItem = (itemid)=>{
    const newarr  = list.filter((listitem)=>listitem.id!==itemid);
    setLocalStorage(newarr);
    setList(newarr);
    setName('');
    showAlert(true, 'Item Deleted', 'alert-red');
  }
  const clearItem = ()=>{
    localStorage.clear();
    setList([]);
    setName('');
    showAlert(true, 'Removed All', 'alert-red');
  }
  const editItem = (item)=>{
    setName(item.title);
    setIsEditing(true);
    setEditId(item.id);
  }
  const showAlert =(show,msg,type) =>{
    setIsAlert({show, msg, type});
  }
  return (
    <div className="container">
      <div className="mainBox">
        { isAlert.show &&  <Alert {...isAlert} removeAlert={showAlert} list={list} />}
        <h3 className="app-title">Work List</h3>
        <form className="app-form" onSubmit={addListItem}>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-input" placeholder="e.g. Assign Leads" />
          <button type="submit" className="form-btn">
            {
              (isEditing)?'Edit':'Submit'
            }
          </button>
        </form>
        <section className="work-list">
          <List list={list} deleteItem={deleteItem} editItem={editItem} />
        </section>
        {
          list.length > 0 && <button className="form-btn-danger" onClick={()=>clearItem()}>Clear Item</button>
        }
      </div>
    </div>
  );
}

export default App;