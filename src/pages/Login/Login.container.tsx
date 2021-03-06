import React, { useEffect } from "react";
import { History } from "history";
import { useDispatch } from "react-redux";
import LoginPage from "./Login.page";
import { appInfo } from "_core/config/constants";
import {
  setLoginAction,
  setPageAction,
  modalDialogAction
} from "_core/redux/actions";
import { getLogin, setLogin } from "_core/config/login.conf";

type Props = {
  history: History;
};

const LoginPageContainer = (props: Props) => {
  const dispatch = useDispatch();

  const checkLoginHandler = async () => {
    const isLogged: any = await getLogin();
    if (!isLogged.errorMessage) {
      // check login on DATABASE and save data on machine if true

      const { user, password, dateLogin, expireOn } = isLogged.dataLogin;
      dispatch(
        setLoginAction({
          user,
          password,
          dateLogin,
          expireOn
        })
      );
      return true;
    } else {
      return false;
    }
  };
  const setLoginHandler = async () => {
    const getUser = (document.querySelector("#user") as HTMLInputElement).value;
    const getPass = (document.querySelector("#password") as HTMLInputElement)
      .value;

    if (!getUser || !getPass) {
      dispatch(
        modalDialogAction({
          open: true,
          type: "warn",
          title: "Atenção",
          content: <p>Preencha todos os campos para efetuar o login!</p>,
          buttons: [
            {
              appearance: "primary",
              label: "Tentar Novamente"
            }
          ]
        })
      );
      return false;
    } else {
      // check login on DATABASE and save data on machine if true

      const loginSystem: any = await setLogin({
        user: getUser,
        password: getPass
      });

      if (!loginSystem.errorMessage) {
        const { user, password, dateLogin, expireOn } = loginSystem.dataLogin;
        dispatch(
          setLoginAction({
            user,
            password,
            dateLogin,
            expireOn
          })
        );
        return true;
      } else {
        dispatch(
          modalDialogAction({
            open: true,
            type: "err",
            title: "Erro de Login",
            content: <p>Não foi possível efetuar o login! <br /> Verifique os dados digitados.</p>,
            buttons: [
              {
                appearance: "primary",
                label: "Tentar Novamente"
              }
            ]
          })
        );
        alert("Erro ao Efetuar Login!");
        return false;
      }
    }
  };

  useEffect(() => {
    dispatch(
      setPageAction({
        title: `Login do Sistema - ${appInfo.orgShortName}`,
        location: props.history.location
      })
    );
  }, [dispatch, props.history]);

  return (
    <LoginPage
      {...props}
      checkLoginHandler={checkLoginHandler}
      setLoginHandler={setLoginHandler}
    />
  );
};

export default LoginPageContainer;
