import React from "react";
import { useEffect, useState } from "react";
import DDDD from "./dddd";

export default function () {
    const [textList, setList]=useState([]);
    
    // useEffect(() => {
    //     fetch("api/mockdata.json",{
    //     headers : { 
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //     }}).then((res) => res.json())
    //     .then((data) => {
    //     const textdata=data.data.map((item)=>{ //text 모두 담은 배열
    //       return item.text;
    //     })
    //     setTextList(textdata);
    //   });
    // }, []);
    
    // return (

    // );
}