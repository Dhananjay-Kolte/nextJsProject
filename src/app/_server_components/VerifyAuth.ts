import { cookies } from "next/headers";
import { AppConstants } from "../constants";
import { redirect } from "next/navigation";

export default function VerifyAuth({ returnUrl }: { returnUrl: string }) {
  let JWT = cookies().get(AppConstants.SESSION_KEY);

  console.log(JWT);

  if (JWT && JWT.value) {
    let decodedJWT = decodeJWT(JWT.value);
    if (decodedJWT.exp * 1000 < new Date().getTime()) {
      redirect("/login?originalPage=" + (returnUrl || ""));
    } else {
      console.log("AUTHENTICATED ALREADY");
      // redirect(returnUrl + "?authState=true");
    }
  } else {
    redirect("/login?originalPage=" + (returnUrl || ""));
  }
}

function decodeJWT(jwt: string) {
  if (jwt) {
    console.log(jwt);
    let payload = jwt.split(".")[1];

    if (payload) {
      let jsonString = Buffer.from(payload, "base64").toString();

      try {
        return JSON.parse(jsonString);
      } catch (err) {
        console.log(err);
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export function getUserFromJWT() {
  let JWT = cookies().get(AppConstants.SESSION_KEY);

  console.log(JWT);

  let user = null;

  if (JWT && JWT.value) {
    let decodedJWT = decodeJWT(JWT.value);
    if (decodedJWT.exp * 1000 > new Date().getTime()) {
      user = decodedJWT;
    }
  }

  return user;
}
