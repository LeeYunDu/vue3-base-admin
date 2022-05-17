import request from '@/utils/request'

// 上传文件
export function uploadFile() {
  return process.env.VUE_APP_BASE_API + `/sos-files/files/manager/allow/upload`
}

