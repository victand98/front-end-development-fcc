import { DefaultLayout, DrumPad, Title } from "@/components";
import { DRUM_PADS } from "@/lib";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";

const DrumMachine: NextPageWithLayout = () => {
  const [displayText, setDisplayText] = React.useState("---");

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const drumPadDiv = document.querySelector(
        `.drum-pad#${e.key.toUpperCase()}`
      ) as HTMLDivElement;
      if (drumPadDiv) {
        drumPadDiv.click();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const onSoundPlayed = (label: string) => {
    setDisplayText(label);
  };

  return (
    <>
      <Head>
        <title>Drum Machine</title>
      </Head>

      <div className="container mx-auto p-4" id="drum-machine">
        <Title>Drum Machine</Title>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          <div className="grid grid-cols-3 gap-4">
            {DRUM_PADS.map((drumPad) => (
              <DrumPad
                key={drumPad.key}
                id={drumPad.key}
                sound={drumPad.sound}
                label={drumPad.label}
                onSoundPlayed={onSoundPlayed}
              />
            ))}
          </div>

          <div id="display" className="border bg-slate-500 rounded-md p-4">
            <p className="font-bold text-white text-center text-xl">
              {displayText}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

DrumMachine.getLayout = (page: React.ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default DrumMachine;
