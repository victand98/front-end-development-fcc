import { DefaultLayout, IconButton, Title } from "@/components";
import { formatTime } from "@/lib";
import classNames from "classnames";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";
import { FaMinus, FaPause, FaPlay, FaPlus } from "react-icons/fa";
import { MdRestartAlt } from "react-icons/md";

const Pomodoro: NextPageWithLayout = () => {
  const [sessionLength, setSessionLength] = React.useState(25);
  const [breakLength, setBreakLength] = React.useState(5);
  const [timerLabel, setTimerLabel] = React.useState<"Session" | "Break">(
    "Session"
  );
  const [timeLeft, setTimeLeft] = React.useState(25 * 60);
  const [breakTimeLeft, setBreakTimeLeft] = React.useState(5 * 60);
  const [isRunning, setIsRunning] = React.useState(false);
  const beepRef = React.useRef<HTMLAudioElement>(null);

  const handleReset = () => {
    setSessionLength(25);
    setBreakLength(5);
    setTimerLabel("Session");
    setTimeLeft(25 * 60);
    setBreakTimeLeft(5 * 60);
    setIsRunning(false);
    if (beepRef.current) {
      beepRef.current.pause();
      beepRef.current.currentTime = 0;
    }
  };

  const handleSessionDecrement = () => {
    if (isRunning) return;
    if (sessionLength > 1) {
      const newSessionLength = sessionLength - 1;
      setSessionLength(newSessionLength);
      setTimeLeft(newSessionLength * 60);
    }
  };

  const handleSessionIncrement = () => {
    if (isRunning) return;
    if (sessionLength < 60) {
      const newSessionLength = sessionLength + 1;
      setSessionLength(newSessionLength);
      setTimeLeft(newSessionLength * 60);
    }
  };

  const handleBreakDecrement = () => {
    if (isRunning) return;
    if (breakLength > 1)
      setBreakLength((prev) => {
        const newBreakLength = prev - 1;
        setBreakTimeLeft(newBreakLength * 60);
        return newBreakLength;
      });
  };

  const handleBreakIncrement = () => {
    if (isRunning) return;
    if (breakLength < 60)
      setBreakLength((prev) => {
        const newBreakLength = prev + 1;
        setBreakTimeLeft(newBreakLength * 60);
        return newBreakLength;
      });
  };

  const handleStartStop = React.useCallback(() => {
    setIsRunning((prevState) => !prevState);
  }, []);

  const handleTimerTick = React.useCallback(() => {
    if (isRunning) {
      if (timerLabel === "Session") {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 0) {
            beepRef.current?.play();
            setTimerLabel("Break");
            return sessionLength * 60;
          }
          return prevTimeLeft - 1;
        });
      } else {
        setBreakTimeLeft((prevBreakTimeLeft) => {
          if (prevBreakTimeLeft === 0) {
            beepRef.current?.play();
            setTimerLabel("Session");
            return breakLength * 60;
          }
          return prevBreakTimeLeft - 1;
        });
      }
    }
  }, [isRunning, timerLabel, sessionLength, breakLength, beepRef]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      handleTimerTick();
    }, 1000);

    return () => clearInterval(interval);
  }, [handleTimerTick]);

  return (
    <>
      <Head>
        <title>25 + 5 Clock</title>
      </Head>

      <div className="container mx-auto p-4">
        <Title>25 + 5 Clock</Title>

        <div className="bg-slate-600 border border-slate-700 text-white rounded-lg shadow-md p-4 space-y-4 max-w-md mx-auto select-none">
          <div className="flex flex-col items-center lg:flex-row lg:justify-center gap-2 lg:gap-4">
            <div className="space-y-2">
              <p
                id="session-label"
                className="font-semibold text-sm text-center opacity-80"
              >
                Session Length
              </p>

              <div className="flex items-center gap-3">
                <IconButton
                  id="session-decrement"
                  icon={FaMinus}
                  className="text-xs"
                  onClick={handleSessionDecrement}
                />
                <span id="session-length">{sessionLength}</span>
                <IconButton
                  id="session-increment"
                  icon={FaPlus}
                  className="text-xs"
                  onClick={handleSessionIncrement}
                />
              </div>
            </div>

            <div className="space-y-2">
              <p
                id="break-label"
                className="font-semibold text-sm text-center opacity-80"
              >
                Break Length
              </p>

              <div className="flex items-center gap-3">
                <IconButton
                  id="break-decrement"
                  icon={FaMinus}
                  className="text-xs"
                  onClick={handleBreakDecrement}
                />
                <span id="break-length">{breakLength}</span>
                <IconButton
                  id="break-increment"
                  icon={FaPlus}
                  className="text-xs"
                  onClick={handleBreakIncrement}
                />
              </div>
            </div>
          </div>

          <div className="border border-slate-400 rounded-lg text-center space-y-3 py-3">
            <h3 id="timer-label" className="font-semibold text-2xl opacity-80">
              {timerLabel}
            </h3>

            <span
              id="time-left"
              className={classNames("font-semibold text-2xl", {
                "text-red-500": timerLabel === "Session" && timeLeft <= 60,
                "text-green-500": timerLabel === "Break" && breakTimeLeft <= 60,
              })}
            >
              {formatTime(timerLabel === "Session" ? timeLeft : breakTimeLeft)}
              <audio src="/assets/audio/alarm.mp3" id="beep" ref={beepRef} />
            </span>

            <div className="flex justify-center gap-2">
              <IconButton
                id="start_stop"
                icon={isRunning ? FaPause : FaPlay}
                className={classNames("text-xs", {
                  "bg-red-500 hover:bg-red-600": isRunning,
                  "bg-green-500 hover:bg-green-600": !isRunning,
                })}
                onClick={handleStartStop}
              />
              <IconButton
                id="reset"
                icon={MdRestartAlt}
                className="text-xs bg-slate-400 hover:bg-slate-500"
                onClick={handleReset}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Pomodoro.getLayout = (page: React.ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default Pomodoro;
