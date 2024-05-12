import { loadURL } from '@janhq/core'

export const useLoadURL = () => {
  const onClickMode = async (url: string) => {
    loadURL(url)
  }

  return onClickMode
}
