export default function Button({btnname, }){

    return (
        <div>
            {/* 정말 round 한거 */}
            <button
                className="py-2 px-4 font-semibold text-white rounded-3xl shadow-md bg-green-500 hover:bg-green-700"
            >
                {btnname}
            </button>

            {/* 덜 round 한거 - Login, 회원가입, 취소, 확인 버튼 */}
            <button
                className="py-2 px-4 font-semibold text-white rounded-md bg-green-500 hover:bg-green-700"
            >
                Login
            </button>
        </div>
    )
}