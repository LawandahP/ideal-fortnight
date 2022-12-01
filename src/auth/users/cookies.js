
export function getCookie(name){
    var pattern = RegExp(name + "=.[^;]*")
    var matched = document.cookie.match(pattern)
    if(matched){
        var cookie = matched[0].split('=')
        return cookie[1]
    }
    return false
}

export function deleteCookie(name) {
    var pattern = RegExp(name + "=.[^;]*")
    var matched = document.cookie.match(pattern)

    if(matched) {
        // var cookie = matched[0].split('=')
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'; 

    }
}