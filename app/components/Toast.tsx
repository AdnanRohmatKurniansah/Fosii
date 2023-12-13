import { toast, ToastOptions } from "react-toastify"

type ToastType = "info" | "success" | "warning" | "error"

export const alert = (message: string, type: ToastType) => {
  if (!["info", "success", "warning", "error"].includes(type)) {
    throw new Error(`Invalid toast type: ${type}`)
  }

  const options: ToastOptions = {
    position: 'top-right',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  }

  toast[type](message, options)
}
