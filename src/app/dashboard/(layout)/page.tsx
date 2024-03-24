import OpenDialogOnElementClick from '@/front/components/dialogs/OpenDialogOnElementClick'
import EditUserInfoModal from '@/front/views/dialogs/edit-user-info/EditUserInfoModal'
import CreateAppModal from '@/front/views/dialogs/create-app'
// import CardMobile from '@front/components/cards/CardMobile'
import { Button, Hr } from './htmlStyle'

export default function Page() {
  // const Button = <button> Click Me</button>

  return (
    <>
      <h1>Home page!</h1>
      <Hr marginTop={'0px'} />
      <OpenDialogOnElementClick element={Button} elementProps={{ text: 'USER MODAL' }} dialog={EditUserInfoModal} />
      <Hr />
      <OpenDialogOnElementClick element={Button} elementProps={{ text: 'WIZZARD MODAL' }} dialog={CreateAppModal} />
      <Hr />
      {/* <CardMobile /> */}
    </>
  )
}
