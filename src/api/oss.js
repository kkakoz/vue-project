import OSS from 'ali-oss'
import {
    get
} from '.'


export const oss = () => {
    return get('/oss/get-conf')
}


export async function put(name, File) {
    let data = await oss()
    console.log("data = ", data)
    const client = new OSS({
        region: data.region,
        accessKeyId: data.accessKeyId,
        accessKeySecret: data.accessKeySecret,
        bucket: data.bucket,
    })
    // 填写目录名称，目录需以正斜线结尾。
    return client.put(name, File)
}
