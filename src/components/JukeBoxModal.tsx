import { useJukeBox } from "@/controller/JukeBoxProvider";
import { useMobile } from "@/util/useMobile";
import { useCallback, useEffect, useMemo } from "react";

export const JukeBoxModal = () => {
  const {
    playJukeBox,
    amIPlayingJukeBox,
    stopJukeBox,
    jukeBoxTrack,
    someoneElsePlayingJukeBox,
    jukeBoxParticipant,
  } = useJukeBox();

  const isMobile = useMobile();

  const inner = useMemo(() => {
    if (amIPlayingJukeBox) {
      // I'm playing
      return isMobile ? (
        <div className="flex items-center">
          <div className="text-neutral-content max-w-[300px]">
            你正在播放音乐
          </div>
          <button
            className="btn btn-outline btn-sm btn-primary m-2"
            onClick={stopJukeBox}
          >
            停止
          </button>
        </div>
      ) : (
        <div className="text-neutral-content">
          你正在播放音乐，按 <span className="font-bold">[x]</span> 停止。
        </div>
      );
    } else if (jukeBoxParticipant !== null) {
      // Someone else is playing
      return (
        <div className="text-neutral-content">
          <span className="font-bold">{jukeBoxParticipant}</span> 正在播放音乐
        </div>
      );
    } else {
      // No one is playing
      return isMobile ? (
        <div className="flex items-center">
          <div className="text-neutral-content w-[300px]">
            想通过 WebRTC 听空间音频音乐吗？点击播放。
          </div>
          <button
            className="btn btn-outline btn-sm btn-primary m-2"
            onClick={playJukeBox}
          >
            播放
          </button>
        </div>
      ) : (
        <div className="text-neutral-content max-w-[300px]">
          按 <span className="font-bold">[x]</span> 播放空间音频音乐。
        </div>
      );
    }
  }, [
    amIPlayingJukeBox,
    isMobile,
    jukeBoxParticipant,
    playJukeBox,
    stopJukeBox,
  ]);

  const keyDownListener = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "x") {
        if (amIPlayingJukeBox) {
          stopJukeBox();
        } else {
          playJukeBox();
        }
      }
    },
    [amIPlayingJukeBox, playJukeBox, stopJukeBox]
  );

  useEffect(() => {
    if (isMobile) return;
    document.addEventListener("keydown", keyDownListener);

    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  }, [isMobile, keyDownListener]);

  return (
    <div className="flex flex-col items-center p-4 bg-neutral rounded-md">
      {inner}
    </div>
  );
};
