"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { saveCartItems } from "@/state/features/cartSlice";
import { AppDispatch } from "@/state/store";
import api from "@/utils/axios";
import { useUser } from "./UserProvider";

export default function CartSync() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) {
      dispatch(saveCartItems([]));
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await api.get("/cart");
        if (!cancelled) dispatch(saveCartItems(res.data));
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.id, dispatch]);

  return null;
}
