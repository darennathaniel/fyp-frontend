import { setError } from "@/reducers/app";
import { AxiosError } from "axios";
import { useAppDispatch } from "./useAppDispatch";
import { IStatus } from "@/types/user/IStatus";
import { useNavigate } from "react-router";

export function useError() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const showCustomError = (error: string) => {
    dispatch(
      setError({
        statusCode: 400,
        message: error,
        show: true,
      })
    );
  };
  const showError = (error: AxiosError<IStatus>) => {
    dispatch(
      setError({
        statusCode: error.response?.status ?? 400,
        message: error.response?.data.message ?? "undefined error",
        show: true,
      })
    );
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data &&
      error.response.data.message &&
      error.response.data.message !== "credentials does not match"
    ) {
      navigate("/sso/login");
    }
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
  return { showError, closeError, showCustomError };
}
