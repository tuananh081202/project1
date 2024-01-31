import React, { useEffect, useState } from 'react'

const LiveSearch = ({onKeySearch}) => {
    const [keyword,setKeyWord] = useState('')
    useEffect(() =>{
        const delayDebounce = setTimeout(() =>{
            console.log("call func onKeySearch")
            onKeySearch(keyword)

        },5000)
        return () =>clearTimeout(delayDebounce)
    },[keyword])
    const onTying = (event) =>{
        const target = event.target;

        console.log('keyword typing=>',target.value)
        onKeySearch(target.value)
        setKeyWord(target.value)
    }
  return (
    <input type='search' onChange={onTying} value={keyword} className='form-control form-control-sm ms-1' placeholder='Email or Name'></input>
  )
}

export default LiveSearch