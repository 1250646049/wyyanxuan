import jsonWebToken from 'jsonwebtoken'

const user={
    username:123,
    password:4567
}

// 设置token
export const token=function SetToken(user){


    return jsonWebToken.sign(user,"lhytianxiazuishuai",{expiresIn: '7day' })
}


// 解密token

export const decodeToken=(token)=>jsonWebToken.decode(token)


// 存储token

export const saveToken=(token)=>{
 window.localStorage.setItem("token",token)

}

// 获取token并且解密

export const getSaveToken=()=>{


    let tokens=window.localStorage.getItem("token")
    if(!token){
        return ""
    }
   return decodeToken(tokens)

}
