'use client'
import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineSkipNext } from "react-icons/md";
import { IoPlayCircleOutline } from "react-icons/io5";
import { ImPause } from "react-icons/im";
import { Slider } from "@/components/ui/slider"

interface contents<T>{
  items:T[];
}
interface details{
  artist:string;
  id:string;
  musicID:string;
  musicURL:string;
  thumbnail:{
    height:number;
    url:string;
    width:number;
  }
  title:object;
}
const Listen:React.FC<contents<details>> =({items})=>{
  const [musicData,setMusicData] = useState<details[]>([]);
  const [jump,setJump] = useState<number>(0);
  const [play,setPlay] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(()=>{
    setMusicData(items);
  },[])
  const goNext = ()=>{
    if(jump<musicData.length-2){
      setJump(prev=>prev+1);
      setPlay(true);
    }
  }
  const goBack= ()=>{
    if(jump>musicData.length-3){
     setJump(prev=>prev-1);
     setPlay(true);
    }
  }
  const playMusic = ()=>{
    audioRef.current!.volume=0.5;
    audioRef?.current?.play();
    setPlay(false);
  }
  const stopMusic = ()=>{
    audioRef?.current?.pause();
    setPlay(true);
  }
  const musicEnd = ()=>{
    setPlay(true);
  } 
  const setVolume = (e:number[])=>{
    audioRef.current!.volume=e[0]*(1/100)
  }
  return (
    <div>
      <div className='rounded-[15px] bg-gradient-to-b from-[#010104] to-[#011760] w-[400px] h-[400px] pt-8 mx-auto'>
        <main className='w-[200px] h-[200px] border-4 border-white mx-auto mb-4 flex relative overflow-hidden'>
          <div className={`flex absolute w-full  h-full transition-all duration-300 bg-green-400`}
               style={{transform:`translateX(${100 * jump}%)` }}>
            {musicData?.map((elm,index)=>{
              return(
                <img key={index} className={` w-full h-full object-cover mb-4`} src={musicData[index]?.thumbnail.url} alt="musicIcon" />
              )
            })}
          </div>
       </main>
        <audio onEnded={musicEnd} ref={audioRef} controls className='absolute z-20 hidden' src={`/${musicData[Math.abs(jump)]?.musicURL}`}></audio>
        <div className='mx-auto w-[200px]'>
          <div className='flex justify-evenly'>
              <div>
                <MdOutlineSkipNext onClick={goBack} className='text-white w-11 h-11 rotate-180'/>
              </div>
              <div>
                {play?
                <IoPlayCircleOutline onClick={playMusic} className='text-white w-11 h-11'/>:
                <ImPause onClick={stopMusic} className='text-white w-11 h-11'/>}
              </div>
              <div>
                <MdOutlineSkipNext onClick={goNext} className='text-white w-11 h-11'/>
              </div>
          </div>
        </div>
        <div className='w-[60%] mt-8 mx-auto border'>
          <Slider onValueChange={(e:number[])=>{setVolume(e)}} defaultValue={[0]} max={100} step={1} />
        </div>
      </div>
    </div>
  )
}

export default Listen