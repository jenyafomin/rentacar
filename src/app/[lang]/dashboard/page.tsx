import OpenDialogOnElementClick from '@/front/components/dialogs/OpenDialogOnElementClick'
import EditUserInfoModal from '@/front/views/dialogs/edit-user-info/EditUserInfoModal'
import CreateAppModal from '@/front/views/dialogs/create-car/CarWizzard'
// import CardMobile from '@front/components/cards/CardMobile'
import { Button, ButtonFetch, Hr } from './htmlStyle'
import CreateCarModal from '@/front/views/dialogs/create-car/CarWizzard'
import { useSession } from 'next-auth/react'
import AllCars from './cars/page'

export default function Page() {
  // const { data: session } = useSession()
  // // const Button = <button> Click Me</button>
  // if (!session) {
  //   return (
  //     <div>
  //       <h1>You are not signed in</h1>
  //       <a href="/api/auth/signin">Sign in</a>
  //     </div>
  //   )
  // }
  return AllCars();

  return (
    <>
      <h1>Home page!</h1>
      <Hr marginTop={'0px'} />
      <OpenDialogOnElementClick element={Button} elementProps={{ text: 'USER MODAL' }} dialog={EditUserInfoModal} />
      <Hr />
      <OpenDialogOnElementClick element={Button} elementProps={{ text: 'WIZZARD MODAL' }} dialog={CreateCarModal} />
      <Hr />
      <ButtonFetch/>
      {/* <CardMobile /> */}
    </>
  )
}
