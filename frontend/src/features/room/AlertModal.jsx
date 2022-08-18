import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

const Error = ({ title, message, groupId }) => {
  const navigate = useNavigate()
  const path = groupId ? groupId : ""

  const { teamId } = useParams()

  const movePage = () => {
    navigate(`/group/${teamId}`)
  }
  const [duration, setDuration] = useState(5)

  useEffect(() => {
    if (duration === 0) {
      navigate(`/group/${teamId}`)
    }

    const countdown = setInterval(() => {
      setDuration((duration) => duration - 1)
    }, 1000)

    return () => countdown && clearInterval(countdown)
  }, [duration])
  return (
    <div className="p-6 text-center">
      <svg
        className="mx-auto mb-4 w-14 h-14  text-warning"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h3 className="mb-5 text-3xl font-bold text-gray-500 ">{title}</h3>
      <div className="flex justify-center items-center flex-col mb-7 ">
        {!!message &&
          message.map((content, idx) => (
            <p className="text-gray-500  font-normal" key={idx}>
              {content}
            </p>
          ))}
      </div>

      <button
        type="button"
        className=" text-darkGray bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-200 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
        onClick={movePage}
      >
        그룹 페이지로 돌아가기
      </button>
      <p className="text-gray-500  font-normal mt-5">
        {duration}초 후에 자동으로 그룹 페이지로 이동합니다.
      </p>
    </div>
  )
}

const Alret = ({ title, message }) => {
  return (
    <div className="p-6 text-center flex flex-col items-center">
      <img
        src="/images/room/hourglass_small.png"
        className="mb-5 animate-pulse "
      />
      <h3 className="mb-5 text-3xl font-bold text-blue-600 ">{title}</h3>
      <div className="flex justify-center items-center flex-col mb-7 ">
        {!!message &&
          message.map((content, idx) => (
            <p className="text-gray-500  font-normal" key={idx}>
              {content}
            </p>
          ))}
      </div>
    </div>
  )
}

const Info = ({ title, onClose }) => {
  return (
    <div className="p-6 text-center flex flex-col items-center w-full h-full relative justify-center">
      <h3 className="my-5 text-4xl font-semibold text-primary-500  ">
        {title}
      </h3>
      <div
        onClick={onClose}
        className="absolute top-2 right-2  font-bold w-12 h-12 text-center flex justify-center items-center  rounded-lg cursor-pointer"
      >
        <span className="text-gray-500">X</span>
      </div>
      <img src="/images/room/info-enter.png" className="mb-2 w-3/5 h-3/5" />
      <div className="flex justify-center items-center flex-col mb-7  text-2xl  bg-lgBlue-200 p-4 px-8 rounded-lg w-full">
        <p className="font-semibold">그림과 같이 전신이 잘 보이도록 서주세요</p>
      </div>
    </div>
  )
}

function AlertModal({
  title = "에러페이지",
  message = undefined,
  groupId,
  type = "alert",
  onClose,
}) {
  console.log("모달 타입:", type)
  return (
    <div className="w-full h-full absolute bg-[#000000a1] z-[9999] top-0 left-0 flex flex-col justify-center items-center">
      {type === "info" ? (
        <div className="relative bg-white rounded-lg shadow w-3/5 h-4/5  ">
          <Info title={title} message={message} onClose={onClose} />
        </div>
      ) : (
        <div className="relative bg-white rounded-lg shadow w-2/6 ">
          {type === "error" ? (
            <Error title={title} message={message} groupId={groupId} />
          ) : (
            <Alret title={title} message={message} />
          )}
        </div>
      )}
    </div>
  )
}

export default AlertModal
