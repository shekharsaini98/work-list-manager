import React,{useEffect} from 'react'

export default function Alert({type, msg, removeAlert, list}) {
    useEffect(()=>{
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000)
    return ()=>clearTimeout(timeout)
    },[list])
    return (
        <div className={`alertBox ${type}`}>
          <p className="alertPara">{msg}</p>
        </div>
    )
}