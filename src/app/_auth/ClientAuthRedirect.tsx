"use client";

import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { useRouter } from "next/navigation";
import { AppConstants } from "../constants";
import jwt from "jsonwebtoken";

export default function ClientAuthRedirect({ page }: any) {
  const { authLoading, isAuthenticated } = useAuth();
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessToken = window.localStorage.getItem(AppConstants.ACCESS_TOKEN);
      setToken(accessToken ?? '')
    }
    let isAuthenticated = false;

    if (token) {
      let decodedToken = jwt.decode(token, {
        json: true,
      });

      console.log(decodedToken);

      if (decodedToken && decodedToken.exp) {
        let d = new Date();
        if (d.getTime() < decodedToken.exp * 1000) {
          isAuthenticated = true;
        }
      }
    }
    if (!isAuthenticated && page.authenticatedPage) {
      router.push("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, router, page]);
  return <></>;
}
