import { setError } from "@/reducers/app";
import { AxiosError } from "axios";
import { useAppDispatch } from "./useAppDispatch";
import { IStatus } from "@/types/user/IStatus";

export function useError() {
  const dispatch = useAppDispatch();
  const showError = (error: AxiosError<IStatus>) => {
    dispatch(
      setError({
        statusCode: error.status ?? 400,
        message: error.response?.data.message ?? "undefined error",
        show: true,
      })
    );
  };
  const closeError = () => {
    dispatch(
      setError({
        statusCode: 200,
        message: "",
        show: false,
      })
    );
  };
  return { showError, closeError };
}
