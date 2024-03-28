// MUI Imports
import Typography from '@mui/material/Typography'

// Component Imports
import PrevNextSubmitBtns from '@/front/components/dialogs/wizzard/prevNextSubmitBtns'
import { StepComponentProps } from '@/front/components/dialogs/wizzard/renderStep'
import Image from 'next/image'
import { ICar } from 'types/Car'

export default function Submit (props: StepComponentProps<ICar>) {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col items-center gap-4'>
        <div className='flex flex-col items-center gap-1'>
          <Typography variant='h5'>Submit</Typography>
          <Typography variant='body2'>Submit to Create your car.</Typography>
        </div>
        <Image alt='submit-img' src='/img/illustrations/2.png' height={200} width={176} />
      </div>
      
      {/* // TODO - Make validation when clicking 'Submit' */}
      <PrevNextSubmitBtns {...props} />
    </div>
  )
}
