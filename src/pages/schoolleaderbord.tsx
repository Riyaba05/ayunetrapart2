import React from 'react'
import Leaderbord from '../components/Leaderbord'
import Layout from './Layout';
import { useState } from 'react';
import supabase from '../../supabase';
import { useEffect } from 'react';
import { useAuthContext } from '@/context';

import {  Text  } from "@chakra-ui/react";

interface LeaderboardEntry {
  schoolname: string;
  views: number;
  name1: string;
  name2: string;
  name3: string;
}


function Schoolleaderbord() {

  const { user } = useAuthContext();
  
const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  const fetchLeaderboardData = async () => {


    const { data, error } = await supabase
      .from("School")
      .select("view , schoolname, Board")
      .order("view", { ascending: false })
      .limit(10); 
      // .eq("District", user?.Board)

      // console.log({data,error});

      
    if (error) {
      console.error("Error fetching leaderboard data:", error);
    } else {
      setLeaderboardData(data as never[]);
    }
      }


       useEffect(() => {
         fetchLeaderboardData();
       }, [user]);

  return (
    <>
      <Layout>
        <Text fontSize="3xl" display={"flex"} justifyContent={"center"}>Leaderbord</Text>
<br />
        {leaderboardData.map((entry, index) => (
          <Leaderbord
            key={index}
            name={entry.schoolname}
            number={entry.views}
            position={index + 1}
          />
          
        ))}
      </Layout>
    </>
  );
}

export default Schoolleaderbord;

//for students shiksha coin earned hase ema evu jova nu k khali plus valu j thay minus valu na thay