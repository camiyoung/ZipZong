import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVolumeXmark, faVolumeUp } from "@fortawesome/free-solid-svg-icons"

export const MusicPlayer = ({ isPlaying, clickButton }) => {
  return (
    <div
      className="absolute z-30 p-3 right-5 top-3 w-14 h-14 bg-white rounded-full justify-center items-center"
      onClick={clickButton}
    >
      {isPlaying ? (
        <FontAwesomeIcon
          icon={faVolumeUp}
          className="w-full h-full text-lgBlue-500"
        />
      ) : (
        <FontAwesomeIcon
          icon={faVolumeXmark}
          className="w-full h-full text-lgBlue-500"
        />
      )}
    </div>
  )
}
