import classNames from "classnames";
import React from "react";

export type DrumPadProps = {
  id: string;
  sound: string;
  label: string;
  onSoundPlayed?: (label: string) => void;
};

export const DrumPad: React.FC<DrumPadProps> = (props) => {
  const [isActive, setIsActive] = React.useState(false);
  const { id, sound, label, onSoundPlayed } = props;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = e.currentTarget.querySelector("audio");
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();
    setIsActive(true);
    setTimeout(() => setIsActive(false), 150);
    onSoundPlayed?.(label);
  };

  const drumPadClass = classNames("drum-pad", {
    active: isActive,
  });

  return (
    <div className={drumPadClass} id={id} onClick={handleClick}>
      <audio className="clip" id={id} src={sound} />
      {id}
    </div>
  );
};
