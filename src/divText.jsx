import React from "react";
import { useEffect, useState} from "react";
import styled from "styled-components";

function ContentEdit() {
  const [pauseIdx, setPauseIdx] = useState([]); //끊어읽기 표시가 어디에 있는 지 커서 인덱스 저장하는 곳
  const [wholeText, setWholeText] = useState(""); //전체 스크립트를 하나로 합친 것

  useEffect(() => {
    fetch("api/mockdata.json",{
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }}).then((res) => res.json())
    .then((data) => {
    const textdata=data.data.map((item)=>{ //text 모두 담은 배열
      return item.text;
    })
    // setWholeText(textdata.join('\n')); //전체 텍스트 줄 바꿔서 저장하기
  });
  }, []);

  useEffect(() => {
    console.log(wholeText);
  }, [wholeText]);

  //사용자가 스페이스바나 엔터등 텍스트영역 안에서 텍스트 변경시 동작
  const handleChange=(e)=>{ 
    console.log("change!");
  }
  
  //클릭시 반응
  const handleClick=(e)=>{
    const selection=window.getSelection(); // 커서의 위치를 알 수 있음
    const range = selection.getRangeAt(0); // 커서의 startOffset과 endOffset을 갖고 있는 객체이다.
    // console.log(range.startOffset); // 문장 별 커서의 start 위치 가리킴.
    // console.log(range.endOffset); // 문장 별 커서의 start 위치 가리킴.
    const boundingClientRect = range.getBoundingClientRect(); //화면 내에서 커서 좌표
    // console.log(boundingClientRect);

    const startIdx=range.startOffset; // 커서의 시작인덱스
    const endIdx=range.endOffset; // 커서의 종료인덱스
    
    //클릭 이벤트
    if(startIdx === endIdx){
      console.log("click event occurs");
      const selectedWord = wholeText[startIdx];//선택된 인덱스의 값 가져오기
  
      if(selectedWord===" "){ //선택된 값이 빈칸이면 띄어쓰기 표시하는 함수 실행하기
        console.log("blankspace is selected");
        setPauseIdx(startIdx); //pause를 state 값에 저장하기
        replaceBlank(wholeText,startIdx,"/ "); //텍스트를 바꾸는 방법 전체 텍스트를 갈아엎어야 함..
      }
    } 

    //드래깅 이벤트
    else{
      console.log("drag event occurs");
      console.log(e.target.value.substring(startIdx,endIdx)); //값 가져오기
    }
  }

  //빈칸을 원하는 문자("/ ")로 바꿔서 넣는 함수
  const replaceBlank = (input, index, character) => {
    console.log("대체!");
    // console.log(input);
    // console.log(index);
    // console.log(character);
    setWholeText(input.substr(0, index) + character + input.substr((index-1)+character.length));
  }


    return (  
    <StWrapper contentEditable="true" onChange={handleChange} onClick={handleClick} suppressContentEditableWarning={true}>
      {wholeText}
    </StWrapper>
    );
}

export default ContentEdit;

const StWrapper =styled.div`
display:flex;
justify-content: center;
align-items: center;

height:30rem;
width:70%;
`;