import { useEffect } from "react";
import { getUserAudio } from "../../../Utilities/userMedia";

export function AudioManager() {
  useEffect(() => {
    getUserAudio(
      (stream) => {},
      (error) => {
        console.log(error)
      }
    );
  }, []);
  return <></>;
}
