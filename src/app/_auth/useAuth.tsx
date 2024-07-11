import { useEffect, useState } from "react";
import { AppConstants } from "../constants";
import jwt from "jsonwebtoken";
import axios from "axios";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<any>({});
  const [authLoading, setAuthLoading] = useState(true);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessToken = window.localStorage.getItem(AppConstants.ACCESS_TOKEN);
      setToken(accessToken ?? '');
    }
    if (token && isAuthenticated) {
      let query = `query {
        me{
            role{
             id
            }
          }
        }`;

      axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
          { query: query, variables: {} },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          axios
            .get(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users-permissions/roles/${res.data.data.me.role.id}?populate=*`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              setUserRole(res.data.role);
            })
            .finally(() => {
              setAuthLoading(false);
            });
          // axios
          //   .get(``, {
          //     headers: {
          //       Authorization: `Bearer ${token}`,
          //     },
          //   })
          //   .then((res) => {})
          //   .finally(() => {

          //   });
        })
        .finally(() => {});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessToken = window.localStorage.getItem(AppConstants.ACCESS_TOKEN);
      setToken(accessToken ?? '');
    }

    if (token) {
      let decodedToken = jwt.decode(token, {
        json: true,
      });

      console.log(decodedToken);

      if (decodedToken && decodedToken.exp) {
        let d = new Date();
        if (d.getTime() < decodedToken.exp * 1000) {
          setIsAuthenticated(true);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsAuthenticated]);

  function canViewTable(recordUid: string, recordAPIId: string) {
    if (userRole && userRole.permissions) {
      let permId = recordUid.replace("." + recordAPIId, "");

      if (
        userRole.permissions[permId] &&
        userRole.permissions[permId].controllers
      ) {
        if (
          userRole.permissions[permId].controllers[recordAPIId].find.enabled
        ) {
          return true;
        }
      }
    }
    return false;
  }

  function canViewRecord(recordUid: string, recordAPIId: string) {
    if (userRole && userRole.permissions) {
      let permId = recordUid.replace("." + recordAPIId, "");

      if (
        userRole.permissions[permId] &&
        userRole.permissions[permId].controllers
      ) {
        if (
          userRole.permissions[permId].controllers[recordAPIId].findOne.enabled
        ) {
          return true;
        }
      }
    }
    return false;
  }

  function canDeleteRecord(recordUid: string, recordAPIId: string) {
    if (userRole && userRole.permissions) {
      let permId = recordUid.replace("." + recordAPIId, "");

      if (
        userRole.permissions[permId] &&
        userRole.permissions[permId].controllers
      ) {
        if (
          userRole.permissions[permId].controllers[recordAPIId].delete?.enabled
        ) {
          return true;
        }
      }
    }
    return false;
  }

  function canUpdateRecord(recordUid: string, recordAPIId: string) {
    if (userRole && userRole.permissions) {
      let permId = recordUid.replace("." + recordAPIId, "");

      if (
        userRole.permissions[permId] &&
        userRole.permissions[permId].controllers
      ) {
        if (
          userRole.permissions[permId].controllers[recordAPIId].update.enabled
        ) {
          return true;
        }
      }
    }
    return false;
  }

  function canCreateRecord(recordUid: string, recordAPIId: string) {
    if (userRole && userRole.permissions) {
      let permId = recordUid.replace("." + recordAPIId, "");

      if (
        userRole.permissions[permId] &&
        userRole.permissions[permId].controllers
      ) {
        if (
          userRole.permissions[permId].controllers[recordAPIId].create.enabled
        ) {
          return true;
        }
      }
    }
    return false;
  }

  return {
    isAuthenticated,
    setIsAuthenticated,
    userRole,
    authLoading,
    canViewRecord,
    canViewTable,
    canCreateRecord,
    canDeleteRecord,
    canUpdateRecord,
  };
}
