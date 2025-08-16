import { TUser } from '../../api/users/users.types'

export type TMockUserProfileResponse = {
  message: string
  data: TUser
}

export const mockUsers: TUser[] = [
  {
    id: '687544d3814217e020e3d03a',
    email: 'ankush.dharkar@gmail.com',
    name: 'Ankush Dharkar',
    picture: '/img/user-1.jpg',
  },
  {
    id: '68702893e331b8aa7a58ffe7',
    email: 'prakash.choudhary@gmail.com',
    name: 'Prakash Choudhary',
    picture: '/img/user-2.jpg',
  },
  {
    id: '68702ff8e331b8aa7a5833',
    email: 'tejas.t@gmail.com',
    name: 'Tejas T',
    picture: '/img/user-3.jpg',
  },
  {
    id: '68704332e331b8aa7a58ffff',
    email: 'yash@gmail.com',
    name: 'Yash',
    picture: '/img/user-4.jpg',
  },
  {
    id: '6870289de331b8aa7a58ffe8',
    email: 'vinit.khandal@gmail.com',
    name: 'Vinit Khandal',
    picture: '/img/user-5.jpg',
  },
]
