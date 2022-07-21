import React, { useState } from "react"
import Button from "../components/button/Button"
import ImageIcon from "../components/icon/ImageIcon"
export default function Locgin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const NotLoggedInYet = () => {
    return (
      <div className="w-6/12 flex justify-center items-center flex-col">
        <p className="text-3xl font-bold mb-5">로그인 하세요</p>
        <div className="flex">
          {/* 카카오 로그인 */}
          <a href="https://www.daum.net">
            <ImageIcon
              shape="round"
              image="https://bidding2.kr/img/kakaoo.png?1"
            />
          </a>

          {/* 네이버 로그인 */}
          <a href="https://www.naver.com">
            <ImageIcon
              shape="round"
              image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAAAbFBMVEUttAD////7/vs0tgm956/I7L2V2X+I1G9TwS/X8c86uA/x+u9nyUdNvyeU2X2F02uw459GvR/k9t+r4Zr2/PWc3Ifn9uJuy0+25ad3zlpbxDmi3o/t+enE6rhjx0GP13fb8tR0zVfP7sXf89g4E0NLAAAFB0lEQVR4nNWc6ZrqIAyG00WrXazWuuu4nPu/x9NF7QZtAyng93Oe0XkHQoAkBCxJJbPtKj6F58gH8KNzeIpX21ki+60g+sH04V7iMHKAKScK44v7SNVi2cvLwWcD1eUfLktVWPZrF45AqqPZ02Ndd5vxTKU2u+vEWLcDlqnU4TYdlr2NxKByRVvMVI7HCnYIi2LJ3wXkWEnMcQUYOd5YhzYOK/XkmUrdx7myUVguevHxtXGJsJI/OqhcfyNmchArXREYVVPOanBRDmHtz9RQuc57OayZpFPgyZ/JYO2mgcq1E8ZKw+moAMI+V9GD9ZDYasYoeohgLScyq0o+/zDGxbqR+4WuHK7h87DW00PlXEcc1lwJVaYLBksZFcB8PNZWHRXAdizWUSUVwHoclquWCoCxHrtYSwWeoSnnNYz1mNyLduV3/H0by16opwJYtA9gbSyyQztOXj+WcnP/yO3D2mswrFJ+wsfSY1ilmubVwFK453Q152HtlXusupw9B0swGkOlAxtL2yr86MbCsglv9GKKbAaWVnsvNe9i/dNq76Uqq/9iadp1mvLaWFcDBisbrmsL666bqNS9iRVo2wyb8oMGlgHLsNS8jmXKYH2Hq8RSc4cepXUNizg6KqO/CivRzVLX9Ys1YdAPr8sXS+OhtKvFB2upm6Sp5RvLiO2w0v2NhZxDx2opbZ3U2jEFG/f9ixIrwH2qi2W9SLEgKLCwh+UuVssMZLHcAgtrWgwsuxErl8XyCixs+J2BZT0osRY5FtrFs7CsFSFWZlyA36aZWPU4gTTWMcNCey0mVv2KIo3lZVjofBMbq7axSmOFGRb61srBqryyNNbGghT7GS5W8plGaSwIAL9P87C+WQZ5rCXgcwNcrM8hVx7rCPg7Dx/r6hNhzeFEiPX2gfJYJ3hSYpXeRh7rCfg0eR9WMY3yWCHgyy/6sIpTkjzWGfDp+14s60SBtQB8aLIfK9gQYEWAjz70Y1kzAiwf8OG2ASwrlsdyKLBa2cD0X/sXBLAIJtG9t38iP4kEJu9Cf4kwHmtD4SBc2PQWIoqsRAJ3mrnQmBbrTLH5sDy7HFYI+LQYE2vTU4ErslUTHGyKaMGJEutEcQwsgxj8Gm+RYyDBobnE8rnTKHJoJrhivEM+BxaSGNYSsNEtPhbwStfwWCnF9fWD5XPeNohcXwku+9+43R8RVkgSGqnCiczKNbHQiHwgqcJymCXUaKw1SditFnw9k2Dt8yAlNofRh8Us2BQKUsqHdOtYTudoKhrSlQ6AN75gIY/l0qQLmv9Xt75VLF0gnVxpDXen/lAsuYItNhjCitr1h0isTyrK0MSdoWlO66Ibpa4qKXzVjVJXlUI3tODA1PIMQ4tZDC39MWa4WoVSppSVfTZUw4rwghaWGTUanZJFI4brW7FofDmsqcXDhpZam1qYbmoZv6GPHkx9ImIl+h7UNKMXP/H8yNTHWqY+bdNiXn6nFUP32eRL/bPJboLNhEemjH4arCe5iu9BrLj5Dz1gVroLsftC6H4cz36ErrmVAPOpdx+WmsYL3GTfr7WpyPz91E09etrs/F4LFMvQhjGWqe11JmtGNNTsbbij1Gr4r2C1Gvyjv9roKteR0MLI2oJlCsiich5hE7VMiUfRci6mbTmXy8gGfbmMbGdYyMTmj4WMbJVZ6PbENBZ9IgdKGCuTeW1Yv3ps45C7BqIw3vY0SZsQq9Q0LX7/A+4hO1TKyqqzAAAAAElFTkSuQmCC"
            />
          </a>

          {/* 구글 로그인 */}
          <a href="http://ec2-3-36-153-120.ap-northeast-2.compute.amazonaws.com:8080/index.html">
            <ImageIcon
              shape="round"
              image="https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg"
            />
          </a>
        </div>
      </div>
    )
  }

  const SetNickName = () => {
    return (
      <div className="w-6/12 flex justify-center items-center flex-col">
        <p className="text-3xl font-bold">
          집중에서 사용하실 닉네임을 입력해주세요.
        </p>
        <form action="" className="flex flex-col items-center">
          <input type="text" />
          <Button
            type="submit"
            text="회원가입"
            height="h-8"
            bgColor="bg-info"
            style={{ marginTop: "10px" }}
          />
        </form>
      </div>
    )
  }
  return (
    <div className="flex">
      <div className="w-6/12 h-screen">
        <img
          src="https://ahopsi.com/wp-content/uploads/2022/03/%EC%97%90%ED%8E%A0%ED%83%91%EA%B3%BC-%EC%9C%A0%EB%A6%AC-%ED%94%BC%EB%9D%BC%EB%AF%B8%EB%93%9C%EA%B0%80-%EB%B9%9B%EB%82%98%EB%8A%94-%E2%80%98%EB%AF%B8%EB%93%9C%EB%82%98%EC%9E%87-%EC%9D%B8-%ED%8C%8C%EB%A6%AC.jpg"
          style={{ height: "100%" }}
          alt="에펠타워"
        />
      </div>
      {/* 로그인되면 버튼들이 보이지 않음 */}
      {isLoggedIn ? <SetNickName /> : <NotLoggedInYet />}
    </div>
  )
}
