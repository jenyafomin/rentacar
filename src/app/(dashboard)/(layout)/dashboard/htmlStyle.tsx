import styled from '@emotion/styled'

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
