import { UserInfo } from '@/types/user.types'
import { action, makeAutoObservable, observable } from 'mobx'

export class UserStore {
  userInfo = {
    userAvatar: '',
    userEmail: '',
    userGroup: [],
    userId: -1,
    userName: '',
    userType: '',
    pCodes: [],
    fCodes: [],
  } as UserInfo

  constructor() {
    makeAutoObservable(this, {
      userInfo: observable,
      setUserInfo: action,
    })
  }

  setUserInfo = (userInfo: UserInfo) => {
    this.userInfo = userInfo
  }
}

