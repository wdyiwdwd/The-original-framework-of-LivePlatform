//工具函数放在这里


//用于POST请求之前发送csrf的那个函数
export const beforePost = (request) => {
 function getCookie(name) {
     let cookieValue = null
     if (document.cookie && document.cookie != '') {
         let cookies = document.cookie.split(';');
         for (let i = 0; i < cookies.length; i++) {
            let cookie = (new String(cookies[i])).trim()
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                break;
             }
         }
     }
     return cookieValue;
 }
 if (!(/^http:.*/.test(request.url) || /^https:.*/.test(request.url))) {
     // Only send the token to relative URLs i.e. locally.
      alert(getCookie('csrftoken'))
      console.log(request.headers.set('X-CSRFToken', getCookie('csrftoken')))
 }
} 

export default {
  beforePost,
}

