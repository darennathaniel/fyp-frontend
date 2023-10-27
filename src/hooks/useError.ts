import { setError } from "@/reducers/app";
import { IError } from "@/types/user/IError";
import { useAppDispatch } from "./useAppDispatch";

export function useError() {
  const dispatch = useAppDispatch();
  const showError = (error: Partial<IError>) => {
    dispatch(
      setError({
        statusCode: error.statusCode ?? 400,
        message: error.message ?? "undefined error",
        show: error.show ?? true,
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
