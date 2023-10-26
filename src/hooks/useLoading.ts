import { setLoading } from "@/reducers/app";
import { useAppDispatch } from "./useAppDispatch";

export function useLoading() {
  const dispatch = useAppDispatch();
  const showLoading = () => {
    dispatch(setLoading(true));
  };
  const closeLoading = () => {
    dispatch(setLoading(false));
  };
  return { showLoading, closeLoading };
}
