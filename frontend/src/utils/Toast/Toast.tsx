import { FC } from "react";

import {
  Toaster,
  useId,
  useToastController,
  Toast,
  ToastTitle,
} from "@fluentui/react-components";

type ToastyProps = {
  message: string;
}

const Toasty: FC<ToastyProps> = ({ message }: ToastyProps) => {
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  const notify = () => {
    return dispatchToast(
      <Toast>
        <ToastTitle>{message}</ToastTitle>
      </Toast>,
      { intent: "info" }
    );
  };

  return (
    <>
      <Toaster
        toasterId={toasterId}
        position="bottom-end"
        pauseOnHover
        pauseOnWindowBlur
        timeout={1000}
      />
    </>
  );
};

export default Toasty;
