import ImageIcon from "../../components/icon/ImageIcon"

export default function ExerciseSelect({ routine, setRoutine, idx, setIdx }) {
  return (
    <div className="flex">
      <div className="bg-primary-100 w-[1100px] h-[300px] rounded-2xl m-3 items-center flex overflow-hidden relative px-16">
        <div
          className="bg-primary-300 w-[50px] h-[300px] absolute left-0 hover:bg-mainBlue"
          onClick={() => {
            if (idx >= 1) {
              setIdx(idx - 1)
            }
          }}
        ></div>
        <div className="flex">
          {routine.slice(idx, idx + 5).map(({ name, icon }) => {
            return (
              <div className="">
                <div className="bg-white w-[170px] h-[240px] rounded-3xl m-3 border-primary-200 flex items-center flex-col justify-center">
                  <div>{index + idx + 1}</div>
                  <div className="">
                    <ImageIcon
                      size="large"
                      shape="round"
                      image={icon}
                    ></ImageIcon>
                  </div>
                  <div className="p-3">{name}</div>
                  <div className="flex">
                    <div>
                      <button
                        className="w-6 bg-lightBlue rounded-2xl hover:bg-mainBlue"
                        onClick={() => {
                          if (count >= 2) {
                            let newRoutine = [...routine]
                            newRoutine[idx + index].count -= 1
                            setRoutine(newRoutine)
                          }
                        }}
                      >
                        -
                      </button>
                    </div>
                    <div className="px-3"> {count} </div>
                    <div>
                      <button
                        className="w-6 bg-lightBlue rounded-2xl hover:bg-mainBlue "
                        onClick={() => {
                          if (count <= 99) {
                            let newRoutine = [...routine]
                            newRoutine[idx + index].count += 1
                            setRoutine(newRoutine)
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div
          className="bg-primary-300 w-[50px] h-[300px] absolute right-0 hover:bg-mainBlue"
          onClick={() => {
            if (idx <= routine.length - 6 && routine.length >= 6) {
              setIdx(idx + 1)
            }
          }}
        ></div>
      </div>
      <div className="bg-secondary-300 w-[200px] h-[300px] rounded-2xl m-3 flex items-center flex-col justify-center">
        <div className="rounded-3xl m-3 border-primary-200 ">
          <div className="flex justify-center">
            <ImageIcon
              size="large"
              shape="round"
              image="http://kaka0.net/data/file/humor/2950631858_xklV5CvP_6.jpeg"
            ></ImageIcon>
          </div>
          <div className="flex justify-center"> 휴식</div>
          <div className="flex justify-center">
            <div> - </div>
            <div> 5 </div>
            <div> + </div>
          </div>
        </div>
      </div>
    </div>
  )
}
