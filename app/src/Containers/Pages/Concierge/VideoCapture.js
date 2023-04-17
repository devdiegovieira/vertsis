import React, { useEffect, useRef } from "react";

export default function VideoCapture() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({
      video: {
        aspectRatio: 1920 / 1080,
        height: { exact: 400 },
        deviceId: { exact: "94c9ec8ea85d6f868ed4d12b4e33c697f81f06705e91ac2b75463ba56da460d1" }
      }
    })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getVideo();
  }, [videoRef])

  return (
    <div>
      <video ref={videoRef} />
    </div>
  )
}