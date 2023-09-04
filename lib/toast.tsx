import { Toast, ToastProps } from "@/components/ui/toast"


export function toastSuccessMessage(message: string) {
  return ({
    title: "Success",
    description: (<p>{message}</p>),
  })
}

export function toastFailureMessage(message: string): ToastProps {
  return ({
    title: "Failure",
    variant: "destructive",
    description: (<p>{message}</p>),
  })
}