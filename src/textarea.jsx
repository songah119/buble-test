import React from "react";
import { useEffect , useState, useRef} from "react";
import styled from "styled-components";

export default function TextArea() {
  const [textList, setTextList]=useState([]); 
  const [pauseIdx, setPauseIdx]=useState([]);
  const inputRef = useRef("");

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
        setTextList(textdata);
      });
    }, []);
    
    // const handleText = () => { //text 설정하는 함수
    //   const result = textList.map((line) => {
    //     return line+"\n"
    //   })
    //   return result;
    // }

    const handleChange=(e)=>{ //사용자가 스페이스바나 엔터등 텍스트영역 안에서 덱스트 변경시 동작
      console.log("change!");
    }

    useEffect(() => { //pauseIdx가 추가 될 때마다 replace 일어남
      console.log(pauseIdx);
    }, [pauseIdx]);

    //클릭시 반응
    const handleClick=(e)=>{  
      const startIdx=e.target.selectionStart;
      const endIdx=e.target.selectionEnd;

      if(startIdx === endIdx){//클릭 이벤트
        console.log("click event occurs");
        const selectedWord=e.target.value[startIdx]; //선택된 영역의 값 가져오기
        console.log(selectedWord);

        if(selectedWord===" "){ //선택된 값이 빈칸이면 띄어쓰기 표시하는 함수 실행하기
          console.log("blankspace is selected");
          setPauseIdx(startIdx); //pause를 state 값에 저장하기
          replaceBlank(e,startIdx);
        }
      } 

      //드래깅 이벤트
      else{
        console.log("drag event occurs");
        console.log(e.target.value.substring(startIdx,endIdx)); //값 가져오기
      }
    }

    //빈칸을 문자 "/"로 바꾸기       //이거 안된대애애애ㅐ애~~~~~~~~~~~~~~~
    const replaceBlank = (e, startIdx) => {
      console.log(">>>>>>>>>",e.target.value[startIdx]);
      console.log(typeof inputRef.current.value[startIdx]);
      e.target.value[startIdx].val("dddd");
    }

  return (
    <StWrapper id="textcontainer" defaultValue={textList} onChange={handleChange} onClick={handleClick} ref={inputRef}>
    </StWrapper>
  );
}

const StWrapper=styled.textarea`
  display:flex;
  justify-content: center;
  align-items: center;

  height:30rem;
  width:70%;
`;
