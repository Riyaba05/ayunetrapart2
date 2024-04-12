import Card from "../../components/card";
import React, { use, useEffect, useState } from "react";
import Bannerad from "../../components/bannerad";
import Layoutt from "../Layout";
import supabase from "../../../supabase";
import { useAuthContext } from "@/context";
import { Grid, Skeleton, Toast } from "@chakra-ui/react";
import { useUser } from "@/store";
import {
  Button,
  Box,
  SkeletonCircle,
  SkeletonText,

} from "@chakra-ui/react";

export default function skillclass() {
  // const router = useRouter();
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  const userStore = useUser((state) => state.user);
  // console.log("userstore", userStore);

  async function getSchool() {
    try {
      let { data, error } = await supabase
        .from("School")
        .select("*")
        // .match({ State: userStore.State, District: userStore.District })
        .range(0, 9);


      setUserData(data);
      setLoading(true);

      if (error) throw error;
    } catch (error) {
      Toast({
        title: "Error",
        description: "Error fetching data",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (userStore && userStore.State) {
      getSchool();
    }
  }, [userStore]);

  if (!user.email) {
    return (
      <div>
       no user found ,if it is taking longer than usual ,please{" "}
        <a href="signup">signup</a>__ /__<a href="/login">signin</a>.
      </div>
    );
  }

  return (
    <>
      <Layoutt>
        <Bannerad />

        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={1}
        >
          <Skeleton isLoaded={loading}>
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Skeleton>
          {userData &&
            userData.map(
              (
                school: {
                  schoolname: string;
                  ratingofschool: number;
                  link: string;
                  img: string;
                },
                index: number
              ) => (
                <Card
                  key={index} // Ensure unique key for each Card
                  name={school.schoolname}
                  rating={school.ratingofschool}
                  link={`/school/${school.schoolname}`}
                  imgsrc={
                    school.img
                      ? ` //wsrv.nl/?url=${school.img}&h=300`
                      : "https://images.unsplash.com/photo-1595528573972-a6e4c0d71f1b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                />
              )
            )}
        </Grid>
        <br />
        <Button onClick={getSchool}>Load More</Button>
      </Layoutt>
    </>
  );
}
