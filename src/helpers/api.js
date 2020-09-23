import axios from "axios"
import {NotificationManager} from "react-notifications"

export const REST_URL = "https://bimename.com/bimename"

function get(url, param = "", dontToast)
{
    const token = !localStorage.hasOwnProperty("user") ? null : JSON.parse(localStorage.getItem("user")).token
    return axios.get(encodeURI(REST_URL + "/" + url + "/" + param), {headers: token ? {"Authorization": `${token}`} : null})
        .then((res) =>
        {
            localStorage.setItem(url + "/" + param, JSON.stringify(res.data))
            return res.data
        })
        .catch((err) =>
        {
            console.log(" %cERROR ", "color: orange; font-size:12px; font-family: 'Helvetica',consolas,sans-serif; font-weight:900;", err.response)
            const cacheData = localStorage.getItem(url + "/" + param)
            if (cacheData)
            {
                if (err?.response?.status !== 404 && !dontToast) NotificationManager.warning("عدم دسترسی به اینترنت، بارگزاری آفلاین...")
                return JSON.parse(cacheData)
            }
            else
            {
                if (err?.response?.status !== 404 && !dontToast) NotificationManager.error("برنامه در گرفتن اطلاعات با خطا مواجه شد!")
                throw err
            }
        })
}

const api = {
    get,
}

export default api