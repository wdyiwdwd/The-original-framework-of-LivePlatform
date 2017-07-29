
//测试一个字符串是否含有特殊字符
export const checkSpecialChar = (str) => {
    let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）――|{}【】‘；：”“'。，、？]")
    if(str !== "" && str !== null){
        if(pattern.test(str)){
            return false
        }
    }
    return true
}

export default {
  checkSpecialChar,
}