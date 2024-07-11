import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AppConstants } from "@/app/constants";

export async function POST(request: Request) {
  const sessionData = await request.json();
  //const encryptedSessionData = encrypt(sessionData);

  console.log(sessionData);

  console.log(`${AppConstants.BACKEND_API_URL}/api/auth/local`);

  let loginRs = await axios
    .post(`${AppConstants.BACKEND_API_URL}/api/auth/local`, {
      identifier: sessionData?.email,
      password: sessionData?.password,
    })
    .then((res) => res)
    .catch((err) => {
      console.log(err.response?.data);
      console.log(err);
      return err.response;
    });

  console.log(loginRs);

  if (loginRs.status === 200) {
    cookies().set({
      name: AppConstants.SESSION_KEY,
      value: loginRs.data.jwt,
      httpOnly: true,
      secure: true, //process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.json({ ...loginRs.data }, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "login failed", data: loginRs.data },
      { status: 401 }
    );
  }
}
