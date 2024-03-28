"use client"
import { getLocaleFromPath } from '@/localization/getLocale'
import { useLocale } from '@/localization/useLocale'
import styled from '@emotion/styled'
import { toast } from 'react-toastify'

export const ButtonStyle = styled.button<any>`
  background: linear-gradient(135deg, #bbb, #777);
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
`

export function Button({ text = 'CLICK ME', ...props }) {
  return <ButtonStyle {...props}>{text}</ButtonStyle>
}

export const Hr = styled.hr<any>`
  width: 100%;
  background: #3f3f3f26;
  color: #2b2b2b;
  height: 1px;
  ${({ marginBottom = '16px' }) => `margin-bottom:${marginBottom};`}
  ${({ marginTop = '16px' }) => `margin-top:${marginTop};`}
`

export function ButtonFetch() {
  const locale = useLocale()

  async function handleClick() {
    const result = await fetch(`/api/cars`, {method: "GET", headers: {
      'x-locale': locale
    }})
    const res = await result.json();

    console.log("result: ", res);
  }

  return <Button onClick={handleClick} text={`${"Make Request".toUpperCase()}`}/>
}

export function ButtonToast() {
  return <button onClick={() => {
    console.log("CLICKED");
    toast("EASY to use")
    const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
    toast.promise(
        resolveAfter3Sec,
        {
          pending: 'Promise is pending',
          success: 'Promise resolved 👌',
          error: 'Promise rejected 🤯'
        }
    )
  }}>CLICK ME</button>
}